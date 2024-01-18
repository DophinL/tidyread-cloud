import { Calendar, Newspaper, Bot, Share2 } from "lucide-react";
import { genUseTranslation } from "../translation";
const locales = {
    "en-US": {
        "title-1": "Schedule",
        "description-1":
            "Schedule your reading, instead of trying to finish it all in one day",
        "title-2": "AI-Digest",
        "description-2":
            "Accelerate your daily reading with AI-Powered digest, helping you save time",
        "title-3": "Automate",
        "description-3":
            "Automatically generated daily digests, delivered to you at your preferred time",
        "title-4": "Sharable",
        "description-4":
            "The generated digests can be shared to others with a link",
    },
    "zh-CN": {
        "title-1": "计划",
        "description-1": "安排您的阅读时间，而非在一天内完成所有阅读",
        "title-2": "AI摘要",
        "description-2": "AI摘要可以帮助您加速日常阅读，节省时间",
        "title-3": "自动化",
        "description-3": "自动生成每日摘要，并在您设定的时间推送给您",
        "title-4": "可分享",
        "description-4": "生成的摘要可以通过链接分享给他人",
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
                        <p className="text-sm text-muted-foreground">
                            {t("description-1")}
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <Newspaper className="h-12 w-12" />
                    <div className="space-y-2">
                        <h3 className="font-bold">{t("title-2")}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t("description-2")}
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <Bot className="h-12 w-12" />
                    <div className="space-y-2">
                        <h3 className="font-bold">{t("title-3")}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t("description-3")}
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <Share2 className="h-12 w-12" />
                    <div className="space-y-2">
                        <h3 className="font-bold">{t("title-4")}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t("description-4")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
