import React from "react";
import { DocsThemeConfig, LocaleSwitch } from "nextra-theme-docs";
import Image from "next/image";
import Link from "next/link";
import useLocale from "./lib/useLocale";
import { genUseTranslation } from "./lib/translation";

const useTranslation = genUseTranslation({
    "en-US": {
        text: "If you encounter slow Digest generation, please click here for a temporary solution →",
    },
    "zh-CN": {
        text: "若遇到Digest生成过慢，请点击此处临时解决 →",
    },
});
function BannerText() {
    const locale = useLocale();
    const { t } = useTranslation();
    return (
        <Link href={`/${locale}/docs/ai-default-config`}>
            <span className="sm:hidden">{t("text")}</span>
            <span className="hidden sm:inline">{t("text")}</span>
        </Link>
    );
}

const config: DocsThemeConfig = {
    darkMode: false,
    i18n: [
        { locale: "en-US", text: "English" },
        { locale: "zh-CN", text: "中文" },
    ],
    project: {
        link: "https://github.com/DophinL/raycast-extensions/tree/ext/tidyread---streamline-your-daily-reading/extensions/tidyread---streamline-your-daily-reading",
    },
    logo: (
        <>
            <Image
                src="/images/logo_with_text.svg"
                alt=""
                width={148}
                height={36}
            ></Image>
            {/* <LocaleSwitch className="ml-5"></LocaleSwitch> */}
        </>
    ),
    sidebar: {
        toggleButton: true,
    },
    // chat: {
    //     link: "https://discord.com",
    // },
    head: (
        <>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <meta
                property="og:description"
                content="An AI-Powered tool that subscribes to RSS feeds and automatically creates concise digests for efficient information consumption."
            />
            <meta
                property="keywords"
                content="Tidyread, Raycast, OpenAI, Moonshot, RSS digest, information summary, AI-powered content, news aggregation, efficient reading, personalized news, Docs, Help Center, Support"
            />
            <link rel="icon" href="/favicon.svg" />
        </>
    ),
    docsRepositoryBase: "https://github.com/DophinL/tidyread-cloud/tree/main",
    // @ts-ignore
    footer: false,
    useNextSeoProps() {
        // const { asPath } = useRouter();
        // if (asPath !== "/") {
        return {
            titleTemplate: "%s | Tidyread",
        };
        // }
    },
    // banner: {
    //     key: "founding-eng-banner",
    //     dismissible: false,
    //     text: <BannerText />,
    // },
};

export default config;
