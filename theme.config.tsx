import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Image from "next/image";
// import { useRouter } from "next/router";

const config: DocsThemeConfig = {
    darkMode: false,
    i18n: [
      { locale: 'en-US', text: 'English' },
      { locale: 'zh-CN', text: '中文' },
    ],
    project: {
      link: 'https://github.com/DophinL/raycast-extensions/tree/ext/tidyread---streamline-your-daily-reading/extensions/tidyread---streamline-your-daily-reading',
    },
    logo: (
        <Image
            src="/images/logo_with_text.svg"
            alt=""
            width={148}
            height={36}
        ></Image>
    ),
    // project: {
    //     link: "https://github.com/shuding/nextra-docs-template",
    // },
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
                content="Tidyread, RSS digest, information summary, AI-powered content, news aggregation, efficient reading, personalized news, Docs, Help Center, Support"
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
            titleTemplate: "%s – Tidyread",
        };
        // }
    },
};

export default config;
