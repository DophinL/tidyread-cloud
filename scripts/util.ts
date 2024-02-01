import { exec } from "child_process";
import dayjs from "dayjs";
import { HttpsProxyAgent } from "https-proxy-agent";
import { omit } from "lodash";
import validator from "validator";

export function isURL(str?: string): boolean {
  return str ? validator.isURL(str) : false;
}

export function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeoutHandle: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(() => {
      reject(
        new Error(
          `Operation timed out after ${timeoutMs} ms, you could try to set "Http Proxy" in "Extensions Settings Page" and try again`,
        ),
      );
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutHandle);
  });
}

export function isXML(str: string) {
  return /^\s*<[\s\S]*>/.test(str);
}

export const isToday = (date: Date, day: string) => {
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekDays[date.getDay()] === day;
};

export function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 0,
  stopOnError: (error: Error) => boolean = () => false, // 新增参数，判断是否是特定错误
): Promise<T> {
  return fn().catch((error: any) => {
    // 检查是否遇到了特定错误
    if (stopOnError(error)) {
      return Promise.reject(error);
    }

    // 当重试次数用完时，返回错误
    if (retries <= 0) {
      return Promise.reject(error);
    }

    // 如果不是特定错误，继续重试
    return new Promise((resolve) => {
      setTimeout(() => resolve(retry(fn, retries - 1, delay, stopOnError)), delay);
    });
  });
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function filterByShownStatus<T extends { show: boolean }>(items: T[]): Omit<T, "show">[] {
  return items.filter((item) => item.show).map((item) => omit(item, "show"));
}

export function reflect<T, P>(
  promise: Promise<T>,
  payload?: P,
): Promise<{
  payload?: P;
  status: "fulfilled" | "rejected";
  value?: T;
  reason?: any;
}> {
  return promise
    .then((value) => ({ payload, status: "fulfilled" as const, value }))
    .catch((reason) => Promise.reject({ payload, status: "rejected", reason }));
}

export function extractDomain(urlString: string) {
  const parsedUrl = new URL(urlString);
  const hostname = parsedUrl.hostname; // 获取完整主机名，例如 "www.baidu.com"

  // 分割主机名并提取域名部分
  const parts = hostname.split(".");
  const domain = parts.length > 2 ? parts[parts.length - 2] : parts[0];

  return domain;
}

/**
 * 执行一个函数并在出错时返回null。跟lodash attempt类似，不过失败是返回null
 *
 * @param fn 要执行的函数。
 * @returns 函数的返回值或null（如果执行失败）。
 */
export const silent = <T>(fn: () => T): T | null => {
  try {
    return fn();
  } catch (error) {
    return null;
  }
};

export function createAgent() {
  return new HttpsProxyAgent("http://127.0.0.1:33210");
}
