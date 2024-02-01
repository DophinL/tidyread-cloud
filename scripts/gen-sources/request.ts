import fetch, { RequestInit } from "node-fetch";
import { createAgent, withTimeout } from "../util";
import { load } from "cheerio";

interface Metadata {
    title: string;
    favicon: string;
    coverImageUrl: string;
}

// 里面不处理res.json，是因为 fetchHeadContent 会用到原始的response
export async function request(
    url: URL | string,
    options?: RequestInit,
    timeout?: number
) {
    return withTimeout(
        fetch(url, {
            ...options,
            agent: createAgent(),
        })
            .then((res) => {
                // 若res.ok 为 false
                if (!res.ok) {
                    throw new Error(
                        `Request failed with status code ${res.status}: ${res.statusText}`
                    );
                }

                return res;
            })
            .catch((err: any) => {
                if (err.message.includes("connect ECONNREFUSED")) {
                    throw new Error(
                        "Please check if your proxy is connected properly"
                    );
                }

                throw err;
            }),
        timeout ?? 20000
    );
}

export async function fetchHeadContent(url: string): Promise<string | null> {
    const response = await request(url);

    // 确保响应是文本类型
    if (!response.headers.get("content-type")?.includes("text/html")) {
        console.log("Response is not HTML text");
        return null;
    }

    return new Promise((resolve, reject) => {
        let content = "";
        response.body?.on?.("data", (chunk: Buffer) => {
            content += chunk.toString();
            // 检查是否包含 </head>
            if (content.includes("</head>")) {
                response.body!.pause(); // 停止接收数据
                resolve(content.split("</head>")[0] + "</head>");
            }
        });

        response.body?.on?.("error", (err: Error) => {
            reject(err);
        });

        response.body?.on?.("end", () => {
            // 如果没有找到 </head>，则返回已接收的全部内容
            resolve(content);
        });
    });
}

export async function fetchMetadata(url: string): Promise<Metadata> {
    // const response = await request(url);
    // 如果用这种方式，当文本内容过大时（比如2M），会导致内存溢出，导致页面崩溃
    // const body = await response.text();
    const body = await fetchHeadContent(url);
    const $ = load(body || "");

    const title = $("title").text();
    let favicon =
        $('link[rel="icon"], link[rel="shortcut icon"]').attr("href") ?? "";

    // 处理相对路径的 favicon
    if (favicon && !favicon.startsWith("http")) {
        const baseUrl = new URL(url).origin;
        favicon = new URL(favicon, baseUrl).href;
    }

    // 尝试获取封面图 URL
    let coverImageUrl =
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content");
    // 取其它的并不准确
    // $('link[rel="image_src"]').attr("href") ||
    // $("img").first().attr("src");

    // 处理相对路径的封面图 URL
    if (coverImageUrl && !coverImageUrl.startsWith("http")) {
        coverImageUrl = new URL(coverImageUrl, new URL(url).origin).href;
    }

    console.log(
        `url: ${url} ; title: ${title}; favicon: ${favicon} ; coverImageUrl: ${coverImageUrl}`
    );

    return { title, favicon, coverImageUrl: coverImageUrl ?? "" };
}
