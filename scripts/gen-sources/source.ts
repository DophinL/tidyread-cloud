import pLimit from "p-limit";
import logger from "../logger";
import { calculateActivityScoreNormalized } from "./recommend";
import { fetchMetadata } from "./request";
import { isValidRSSLink, parseRSS } from "./rss";
import { ExternalSource } from "../types";
import { retry } from "../util";

const limit = pLimit(10);

export async function generateSource(url: string): Promise<ExternalSource> {
  // 验证rss是否可用，不可用的话，取不到link、title等信息，也无法取到items进行活跃度计算，这种情况直接报错
  let isValid = false;
  try {
    isValid = await retry(() => isValidRSSLink(url), 3, 2000);
  } catch (err: any) {
    throw new Error(`RSS link ${url} can not access`);
  }

  if (!isValid) {
    throw new Error(`RSS link ${url} is not valid`);
  }

  // 抓取RSS的link、title等信息
  logger.info("====== start to parse rss ======");
  const feed = await parseRSS(url);
  const sourceTitle = feed.title;
  const sourceUrl = feed.link;
  const description = feed.description ?? "";

  logger.info(feed.title, "parsed content:");

  logger.info("====== start to compute activity ======");
  // 计算权重、活跃度等指标
  const activeScore = calculateActivityScoreNormalized(feed.items);
  // 5分以下都算不活跃。周更27分，月更7分。
  const activeStatus = activeScore > 5 ? "active" : "inactive";
  logger.info(activeScore, activeStatus, "activity:");

  logger.info("====== start to compute weight ======");

  // 计算权重，目前按照活跃度和 COSNTANT_WEITGHT_LIST 来计算
  // TODO: 后续可考虑 社交媒体透出、网站流量权重、用户阅读情况等因素
  const weight = activeScore;

  logger.info(weight, "weight:");

  logger.info("====== start to fetch metadata ======");
  // 抓取favicon
  const metadata = await fetchMetadata(sourceUrl);
  logger.info(metadata, "metadata:");

  // TODO: gpt 输出 tags
  const tags = [];

  // 生成source
  return {
    available: true,
    url: sourceUrl,
    rssLink: url,
    title: sourceTitle,
    favicon: metadata.favicon,
    weight,
    activeStatus,
    activeScore,
    description,
    tags,
  };
}

export async function generateSources(urls: string[]): Promise<{
  success: ExternalSource[];
  failed: { url: string; error: Error }[];
}> {
  const promises = urls.map((url) =>
    limit(() =>
      generateSource(url).catch((err) => ({
        url,
        error: err,
      })),
    ),
  );

  const results = await Promise.all(promises);

  const success: ExternalSource[] = [];
  const failed: { url: string; error: Error }[] = [];

  results.forEach((result) => {
    if ((result as { url: string; error: Error }).error) {
      failed.push(result as { url: string; error: Error });
    } else {
      success.push(result as ExternalSource);
    }
  });

  return { success, failed };
}
