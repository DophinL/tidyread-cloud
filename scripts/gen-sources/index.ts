/**
 * 本脚本用于将 local.rss.yaml 中的rss验证并生成 tidyread 所需的 sources json。计算出权重、活跃度等指标后，导出到 local.rss.json中
 */

import logger from "../logger";
import { calculateActivityScoreNormalized } from "./recommend";
import { fetchMetadata } from "./request";
import { isValidRSSLink, parseRSS } from "./rss";
import { ExternalSource } from "./types";
import { retry } from "./util";

const COSNTANT_WEITGHT_LIST = {
    "https://www.phdeck.com": 100,
};

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
    const sourceUrl = feed.link;
    logger.info(feed.title, "parsed content:");

    logger.info("====== start to compute activity ======");
    // 计算权重、活跃度等指标
    const activeScore = calculateActivityScoreNormalized(feed.items);
    // 5分以下都算不活跃。周更27分，月更6分。
    const activeStatus = activeScore > 5 ? "active" : "inactive";
    logger.info(activeScore, activeStatus, "activity:");

    logger.info("====== start to compute weight ======");

    // 计算权重，目前按照活跃度和 COSNTANT_WEITGHT_LIST 来计算
    // TODO: 后续可考虑 社交媒体透出、网站流量权重、用户阅读情况等因素
    const weight =
        COSNTANT_WEITGHT_LIST[sourceUrl] === undefined
            ? activeScore
            : COSNTANT_WEITGHT_LIST[sourceUrl];

    logger.info(weight, "weight:");

    logger.info("====== start to fetch metadata ======");
    // 抓取favicon和title
    const metadata = await fetchMetadata(sourceUrl);
    logger.info(metadata, "metadata:");

    // TODO: gpt 输出 tags

    // TODO: gpt 输出 description

    // 生成source
    return {
        available: true,
        url: sourceUrl,
        rssLink: url,
        title: metadata.title,
        favicon: metadata.favicon,
        weight,
        activeStatus,
        activeScore,
        tags: [],
    };
}

export async function generateSources(urls: string[]) {
    // 验证rss是否可用
    // 计算权重、活跃度等指标
    // 抓取favicon和title
}

// 解析yaml

async function main() {
    const source = await generateSource("https://diygod.cc/feed");
    logger.info(source);
}

main();
