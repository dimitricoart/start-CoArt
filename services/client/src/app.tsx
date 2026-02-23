import "./global.css";

import { FC, PropsWithChildren } from "react";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { Global } from "@emotion/react";

import { EnabledLanguages, ns } from "@framework/constants";

import { store } from "./libs/store";
import { ApiProvider } from "./libs/providers/api-provider";
import { UserProvider } from "./libs/providers/user-provider";
import { LicenseProvider } from "./libs/providers/license-provider";
import { LocalizationProvider } from "./libs/providers/localization-provider";
import { ThemeProvider } from "./components/theme-provider";
import { PickerProvider } from "./libs/providers/picker-provider";
import { i18n } from "./i18n";
import { muiLexicalStyles } from "./libs/lexical-styles";

const queryClient = new QueryClient();

export const Providers: FC<PropsWithChildren> = props => {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <ApiProvider
          baseUrl={
            process.env.BE_URL ||
            (typeof window !== "undefined" &&
            (window.location.hostname === "coartmarket.com" || window.location.hostname === "www.coartmarket.com")
              ? "https://api.coartmarket.com"
              : "")
          }
          storageName={ns}
        >
          <LicenseProvider>
            <UserProvider>
              <ThemeProvider>
                <Global styles={muiLexicalStyles} />
                <LocalizationProvider i18n={i18n} defaultLanguage={EnabledLanguages.EN}>
                  <PickerProvider>
                    <SnackbarProvider
                      maxSnack={3}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      autoHideDuration={3000}
                    >
                      {children}
                    </SnackbarProvider>
                  </PickerProvider>
                </LocalizationProvider>
              </ThemeProvider>
            </UserProvider>
          </LicenseProvider>
        </ApiProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};
