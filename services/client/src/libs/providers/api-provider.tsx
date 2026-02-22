import { createContext, FC, PropsWithChildren, useCallback, useContext } from "react";
import { getAuth } from "firebase/auth";

import { ApiProvider as FormApiProvider, IApiClient } from "@framework/mui-form";
import { ns } from "@framework/constants";

const baseUrlKey = "__api_base_url";
const storageName = ns;

function getStorageKey(): string {
  return `${storageName}_auth`;
}

async function getIdToken(): Promise<string | null> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) return user.getIdToken();
  const raw = typeof localStorage !== "undefined" ? localStorage.getItem(getStorageKey()) : null;
  if (raw) {
    try {
      const data = JSON.parse(raw);
      if (data?.stsTokenManager?.accessToken) return data.stsTokenManager.accessToken;
    } catch {
      // ignore
    }
  }
  return null;
}

export interface IApiProviderProps {
  baseUrl: string;
  storageName?: string;
}

export const ApiProvider: FC<PropsWithChildren<IApiProviderProps>> = ({ baseUrl, children }) => {
  const api: IApiClient & { setToken?: (t: { accessToken: string }) => void } = {
    setToken: () => {},
    fetchJson: useCallback(
      async <T,>(opts: { url: string; data?: Record<string, unknown>; method?: string }): Promise<T> => {
        const token = await getIdToken();
        const method = (opts as { method?: string }).method ?? "GET";
        let url = `${baseUrl.replace(/\/$/, "")}${opts.url}`;
        const isGet = method === "GET";
        const body = !isGet && opts.data ? JSON.stringify(opts.data) : undefined;
        if (isGet && opts.data && Object.keys(opts.data).length > 0) {
          const search = new URLSearchParams(
            Object.fromEntries(
              Object.entries(opts.data).map(([k, v]) => [k, v == null ? "" : String(v)]),
            ) as Record<string, string>,
          ).toString();
          url += (url.includes("?") ? "&" : "?") + search;
        }
        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          ...(body ? { body } : {}),
        });
        if (!res.ok) {
          const err = new Error(res.statusText) as Error & {
            status: number;
            message?: string;
            getLocalizedValidationErrors?: () => Record<string, string>;
          };
          err.status = res.status;
          try {
            const body = await res.json();
            err.message = body.message ?? res.statusText;
            if (body.errors)
              err.getLocalizedValidationErrors = () => body.errors as Record<string, string>;
          } catch {
            //
          }
          throw err;
        }
        return res.json();
      },
      [baseUrl],
    ),
  };

  return <FormApiProvider api={api}>{children}</FormApiProvider>;
};
