import { IntlProvider } from "react-intl";
import { FC, PropsWithChildren } from "react";

import { useAppSelector } from "../store";
import { languageSelector } from "../store/localization";
import { flattenMessages, i18n } from "../../i18n";
import { EnabledLanguages } from "@framework/constants";

export const LocalizationProvider: FC<
  PropsWithChildren<{
    i18n?: Record<EnabledLanguages, Record<string, unknown>>;
    defaultLanguage?: EnabledLanguages;
  }>
> = ({ children, i18n: i18nMessages = i18n, defaultLanguage = EnabledLanguages.EN }) => {
  const language = useAppSelector(languageSelector);
  const lang = language ?? defaultLanguage;
  const locale = lang.toLowerCase().replace("_", "-");
  const raw = (i18nMessages[lang] ?? i18nMessages[defaultLanguage] ?? {}) as Record<string, unknown>;
  const messages = flattenMessages(raw);
  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale={defaultLanguage.toLowerCase()}>
      {children}
    </IntlProvider>
  );
};
