import Image from "next/image";
import { genUseTranslation } from "../../lib/translation";

const locales = {
    "en-US": {
        follow: "Follow along on X(Twitter)",
        header: "AI-Powered Reading Extension\nInstant Access At Your Fingertips",
        description:
            "A Raycast Extension designed to manage and schedule your daily reading which offers a modern reading experience through AI-Powered digest",
        "get-started": "Get Started",
    },
    "zh-CN": {
        follow: "在 X(Twitter) 上关注进展",
        header: "AI驱动的轻量资讯阅读插件\n弹指间即可唤起",
        description:
            "一款 Raycast 插件，用它来管理和计划你的日常阅读。\n并通过 AI 摘要、整洁的简报使你获得更现代的阅读体验",
        "get-started": "开始使用",
    },
};

const useTranslation = genUseTranslation(locales);

export default function Banner() {
    const { t } = useTranslation();

    return (
        <section className="space-y-6 pb-6 pt-4 md:pb-8 md:pt-6 lg:py-16">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                <a
                    className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
                    target="_blank"
                    href="https://twitter.com/jaredliu_bravo"
                >
                    {t("follow")}
                </a>
                <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl gradient-text lg:leading-tight">
                    {t("header")}
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    {t("description")}
                </p>
                <div className="space-x-4">
                    <a
                        className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-md"
                        href="/docs/getting-started"
                    >
                        {t("get-started")}
                    </a>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-11 px-8 rounded-md"
                        href="https://github.com/DophinL/raycast-extensions/tree/ext/tidyread---streamline-your-daily-reading/extensions/tidyread---streamline-your-daily-reading"
                    >
                        GitHub
                    </a>
                </div>
            </div>
            <div className="flex justify-center">
                <Image
                    src="/images/tidyread_intro.png"
                    width={750}
                    height={474}
                    alt="product_intro"
                />
            </div>
        </section>
    );
}
