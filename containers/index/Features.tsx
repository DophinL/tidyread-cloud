import { Calendar, Newspaper, Bot, Share2 } from "lucide-react";
import { genUseTranslation } from "../../lib/translation";
const locales = {
  "en-US": {
    "title-1": "Schedule",
    "description-1": "Schedule your reading time, no need to finish all reading in one day",
    "title-2": "AI-Powered",
    "description-2": "AI-generated article summaries, translated titles and contents, to speed up your reading",
    "title-3": "Automate",
    "description-3": "Automatically generate daily digests and push them to you at your preferred time",
    "title-4": "Sharable",
    "description-4": "Generated digests and your reading sources can be shared with others via links",
  },
  "zh-CN": {
    "title-1": "计划",
    "description-1": "安排你的阅读时间，不必在一天内完成所有阅读",
    "title-2": "AI提效",
    "description-2": "AI 生成文章摘要，并翻译标题和内容，加速你的阅读",
    "title-3": "自动化",
    "description-3": "自动生成每日简报，并在你设定的时间推送给你",
    "title-4": "可分享",
    "description-4": "生成的简报和你的阅读源，可以通过链接分享给他人",
  },
};

const useTranslation = genUseTranslation(locales);

export default function Features() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-2">
      <div className="relative overflow-hidden rounded-lg border bg-background p-2">
        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
          <Calendar className="h-12 w-12" />
          <div className="space-y-2">
            <h3 className="font-bold">{t("title-1")}</h3>
            <p className="text-sm text-muted-foreground">{t("description-1")}</p>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg border bg-background p-2">
        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
          <Newspaper className="h-12 w-12" />
          <div className="space-y-2">
            <h3 className="font-bold">{t("title-2")}</h3>
            <p className="text-sm text-muted-foreground">{t("description-2")}</p>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg border bg-background p-2">
        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
          <Bot className="h-12 w-12" />
          <div className="space-y-2">
            <h3 className="font-bold">{t("title-3")}</h3>
            <p className="text-sm text-muted-foreground">{t("description-3")}</p>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg border bg-background p-2">
        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
          <Share2 className="h-12 w-12" />
          <div className="space-y-2">
            <h3 className="font-bold">{t("title-4")}</h3>
            <p className="text-sm text-muted-foreground">{t("description-4")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
