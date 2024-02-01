/**
 * 本脚本用于将 local.rss.yaml 中的rss验证并生成 tidyread 所需的 sources json。计算出权重、活跃度等指标后，导出到 local.rss.json中
 */
import fs from "fs/promises";
import yaml from "yaml";
import { generateSources } from "./source"; // 调整为正确的路径
import logger from "../logger";
import path from "path";

const localRSSYamlPath = path.join(__dirname, "../../local.rss.yaml");
const localSourcesJsonPath = path.join(__dirname, "../../local.sources.json");

async function main() {
  // 解析 local.rss.yaml
  const yamlContent = await fs.readFile(localRSSYamlPath, "utf8"); // 调整为正确的路径
  const urls = yaml.parse(yamlContent);
  logger.info(urls, "yaml parsed urls:");

  // 读取 local.sources.json 中已经存在的source
  let existingSources;
  try {
    const sourcesJsonContent = await fs.readFile(localSourcesJsonPath, "utf8"); // 调整为正确的路径
    existingSources = JSON.parse(sourcesJsonContent);
  } catch (error) {
    // 如果文件不存在，则初始化为空数组
    existingSources = [];
  }

  const existingUrls = existingSources.map((source) => source.rssLink);

  // 过滤掉已经存在的source
  const newUrls = urls.filter((url) => !existingUrls.includes(url));

  // 将剩余url进行 generateSources
  const { success, failed } = await generateSources(newUrls);

  // 打印失败的URL和错误信息，以便调试
  failed.forEach(({ url, error }) => {
    logger.error(`Failed to process ${url}: ${error.message}`);
  });

  // 拿出成功的sources，追加到 local.sources.json 中
  const updatedSources = existingSources.concat(success);
  await fs.writeFile(localSourcesJsonPath, JSON.stringify(updatedSources, null, 2), "utf8"); // 调整为正确的路径

  logger.info(
    `Successfully updated sources. Total: ${updatedSources.length}, Newly added: ${success.length}, Failed: ${failed.length}`,
  );

  logger.error(
    failed.map((item) => item.url),
    // failed,
    "Failed items:",
  );
}

main().catch(console.error);
