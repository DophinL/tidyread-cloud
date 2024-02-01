export type ExternalSource = {
  url: string;
  title: string;
  rssLink?: string;
  // 通过gpt来生成
  tags?: string[];
  favicon?: string;
  description?: string;
  available?: boolean;
  // 权重
  weight?: number;
  // 活跃度分数 0 - 100
  activeScore?: number;
  // 活跃状态
  activeStatus?: "active" | "lowActive" | "inactive";
};

export interface RSSItem {
  link?: string;
  title?: string;
  pubDate?: string | number;
  creator?: string;
  summary?: string;
  content?: string;
  coverImage?: string;
  [k: string]: any;
}

export interface RawFeed {
  title: string;
  link: string;
  feedUrl: string;
  items: RSSItem[];
  description?: string;
}