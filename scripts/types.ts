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

export interface ProviderOptions {
  apiKey?: string;
  apiHost?: string;
  apiModel?: string;
  maxTokens?: number;
  httpProxy?: string;
}

export abstract class Provider {
  available: boolean = true;

  // 定义构造函数和它的参数
  constructor(protected options: ProviderOptions) {
    // 初始化操作
  }

  // 定义一个抽象方法
  abstract ask(prompt: string, content: string): Promise<string>;
}
