const withNextra = require("nextra")({
    theme: "nextra-theme-docs",
    themeConfig: "./theme.config.tsx",
});

module.exports = withNextra({
    experimental: {
        appDir: true,
    },
    i18n: {
        locales: ["en-US", "zh-CN"],
        defaultLocale: "en-US",
    },
    redirects: async () => {
        return [
            {
                source: "/docs",
                destination: "/docs/getting-started",
                permanent: true,
            },
        ];
    },
});
