import { round } from "lodash";
import { RSSItem } from "../types";

// 计算活跃度
export function calculateActivityScoreNormalized(
  rssItems: RSSItem[],
  shortTermDays: number = 30,
  longTermDays: number = 180,
  maxShortTermUpdates: number = 30,
  maxLongTermUpdates: number = 180,
): number {
  const currentDate = new Date();
  let shortTermCount = 0;
  let longTermCount = 0;

  rssItems.forEach((item) => {
    const pubDate = item.pubDate ? new Date(item.pubDate as number) : new Date();
    const timeDiff = currentDate.getTime() - pubDate.getTime();
    const daysAgo = timeDiff / (1000 * 3600 * 24);

    if (daysAgo <= shortTermDays) {
      shortTermCount++;
    }
    if (daysAgo <= longTermDays) {
      longTermCount++;
    }
  });

  const shortTermScore = (shortTermCount / maxShortTermUpdates) * 100;
  const longTermScore = (longTermCount / maxLongTermUpdates) * 100;

  // 短期权重更高
  let averageScore = shortTermScore * 0.8 + longTermScore * 0.2;
  averageScore = Math.min(100, averageScore); // 限制最高得分为100

  return round(averageScore, 2);
}
