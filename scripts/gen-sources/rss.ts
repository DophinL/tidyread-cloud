import Parser from "rss-parser";
import { request } from "./request";
import { createAgent, isURL } from "../util";
import { RawFeed } from "../types";

const parser = new Parser({
  requestOptions: {
    agent: createAgent(),
    timeout: 30 * 1000,
    // headers: {
    //   "User-Agent":
    //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    // },
  },
});

export function parseRSS(url: string): Promise<RawFeed> {
  return parser.parseURL(url) as Promise<RawFeed>;
}

// 可能在获取url的时候报错
export async function isValidRSSLink(url: string): Promise<boolean> {
  if (!isURL(url)) return false;

  const response = await request(url, undefined, 20 * 1000);
  const contentType = response.headers.get("content-type");
  const text = await response.text();

  // 检查内容类型是否为 XML
  if (!contentType || !contentType.includes("xml")) {
    return false;
  }

  // 检查是否包含 RSS 特有的标签
  return text.includes("<rss") || text.includes("<channel") || text.includes("<feed");
}
