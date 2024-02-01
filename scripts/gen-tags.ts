/**
 * 通过gpt，对 data/rss.json 文件中tags为空数组的源添加tags。
 */
import pLimit from "p-limit";
import fs from "fs/promises";
import { MoonshotProvider } from "./ai-providers/moonshot";
import { PLAIN_CATEGORIES } from "./const";
import { ExternalSource } from "./types";
import sources from "../data/rss.json";
import { retry } from "./util";
import logger from "./logger";
import path from "path";

const limit = pLimit(3);

const rssJsonPath = path.join(__dirname, "../data/rss.json");

// 定义保存JSON文件的异步函数
async function writeJsonFile(filePath: string, data: any): Promise<void> {
  const content = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, content, "utf8");
}

const provider = new MoonshotProvider({
  apiKey: process.env.MOONSHOT_API_KEY,
  apiModel: "moonshot-v1-32k",
  // maxTokens: 100,
  httpProxy: "http://127.0.0.1:33210",
});

async function genTags(source: ExternalSource): Promise<string[]> {
  const prompt = `
  Please select the most matching tag based on the title and description from an RSS feed and output it directly, without elaboration:

  ${PLAIN_CATEGORIES.join("\n")}
  `;

  const tag = await provider.ask(prompt, `title: ${source.title} description: ${source.description}`);

  if (!PLAIN_CATEGORIES.includes(tag)) {
    throw new Error(`${source.title}: generate tag \`${tag}\` is not valid`);
  }

  return [tag];
}

async function main() {
  // 过滤出tags为空的源
  const sourcesWithoutTags = sources.filter((source) => !source.tags || source.tags.length === 0);

  let successCount = 0;

  // 重复生成tags，因为有可能出错，失败则忽略
  const promises = sourcesWithoutTags.map(async (source) => {
    const tags = await limit(() => retry(() => genTags(source as ExternalSource), 3, 5000));
    source.tags = tags;
    successCount += 1;
    return source;
  });

  await Promise.allSettled(promises);

  // 保存更改回data/rss.json
  await writeJsonFile(rssJsonPath, sources);

  logger.info(`${successCount} sources tags have been successfully updated.`);
}

main();
