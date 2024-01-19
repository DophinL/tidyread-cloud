import { ReactNode } from "react";
import { flatMap } from "lodash";
import useLocale from "./useLocale";
type LocaleTypes = "en-US" | "zh-CN";

type LocaleMessages<T extends Record<string, any>> = {
    [K in LocaleTypes]: T;
};

type TranslationFunction<T extends Record<string, any>> = (
    key: keyof T
) => string;

export function genUseTranslation<T extends Record<string, any>>(
    config: LocaleMessages<T>
) {
    return function useTranslation(): { t: TranslationFunction<T> } {
        const currentLocale = useLocale();

        function t(key: keyof T): string | ReactNode {
            const localeTranslations = config[currentLocale] || config["en-US"];
            const target = (localeTranslations[key] ?? key) as string;

            if (target.includes("\n")) {
                const segments = target.split("\n");
                return flatMap(segments, (segment, index) =>
                    index === segments.length - 1
                        ? [segment]
                        : [segment, <br />]
                );
            }

            return target;
        }

        return { t };
    };
}
