/**
 * 本脚本用于将 gen-souces 生成的 local.sources.json，追加到 data/rss.json 中，若重复，则进行merge（注意title、description、tags 始终以 rss.json 中的为准）。
 */

import fs from "fs/promises";
import { ExternalSource } from "./types"; // 假设这是您之前定义的类型
import path from "path";
import logger from "./logger";

const localSourcesJsonPath = path.join(__dirname, "../local.sources.json");
const rssJsonPath = path.join(__dirname, "../data/rss.json");

// 定义读取JSON文件的异步函数
async function readJsonFile<T>(filePath: string): Promise<T> {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content) as T;
}

// 定义保存JSON文件的异步函数
async function writeJsonFile(filePath: string, data: any): Promise<void> {
    const content = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, content, "utf8");
}

// 定义合并源的函数
async function applySources(
    localSourcesPath: string,
    rssJsonPath: string
): Promise<void> {
    // 读取local.sources.json
    const localSources: ExternalSource[] = await readJsonFile<ExternalSource[]>(
        localSourcesPath
    );
    // 读取data/rss.json
    const rssSources: ExternalSource[] = await readJsonFile<ExternalSource[]>(
        rssJsonPath
    );

    // 将data/rss.json中的源映射为一个以URL为键的对象，以便快速查找
    const rssSourcesMap = new Map(
        rssSources.map((source) => [source.url, source])
    );

    // 遍历localSources，合并或添加到rssSourcesMap
    localSources.forEach((localSource) => {
        const rssSource = rssSourcesMap.get(localSource.url);
        if (rssSource) {
            // 如果存在重复，则进行合并（保留title、description、tags）
            rssSource.url = localSource.url;
            rssSource.rssLink = localSource.rssLink;
            rssSource.favicon = localSource.favicon;
            rssSource.available = localSource.available;
            rssSource.weight = localSource.weight;
            rssSource.activeScore = localSource.activeScore;
            rssSource.activeStatus = localSource.activeStatus;
        } else {
            // 如果不存在，则添加
            rssSourcesMap.set(localSource.url, localSource);
        }
    });

    // 将Map对象转换回数组
    const updatedRssSources = Array.from(rssSourcesMap.values());

    // 保存更改回data/rss.json
    await writeJsonFile(rssJsonPath, updatedRssSources);

    logger.info("Sources have been successfully applied.");
}

// 调用applySources函数
applySources(localSourcesJsonPath, rssJsonPath).catch(console.error);
