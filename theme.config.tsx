import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Image from "next/image";
import Link from "next/link";
import useLocale from "./lib/useLocale";
import { genUseTranslation } from "./lib/translation";
import Logo from "./components/Logo";

const useTranslation = genUseTranslation({
  "en-US": {
    text: "💡 The Chrome extension is currently under development and will provide more practical features. Go check it out! 👀 →",
  },
  "zh-CN": {
    text: "💡 Chrome 插件正在开发中，会提供更多实用功能。前往查看！👀 →",
  },
});

function BannerText() {
  const locale = useLocale();
  const { t } = useTranslation();
  return (
    <Link href={`https://tidyread.ai`} target="_blank">
      {/* `/${locale}/changelog` */}
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
      <Logo />
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        property="og:description"
        content="An AI-Powered Raycast Extension that subscribes to RSS feeds and automatically creates concise digests for efficient information consumption."
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
      titleTemplate: "%s | Tidyread Raycast Extension",
    };
    // }
  },
  banner: {
    key: "banner",
    dismissible: false,
    text: <BannerText />,
  },
  chat: {
    link: "https://t.me/+Gcm3WPxoHEk4ZjNl",
    icon: (
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z"
          fill="#41AADE"
        />
      </svg>
    ),
  },
};

export default config;
