import { createContext, FC, PropsWithChildren, useContext } from "react";

export interface IApiClient {
  fetchJson<T = unknown>(opts: { url: string; data?: Record<string, unknown> }): Promise<T>;
}

const ApiContext = createContext<IApiClient | null>(null);

export const ApiProvider: FC<PropsWithChildren<{ api: IApiClient }>> = ({ api, children }) => (
  <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
);

export function useApi(): IApiClient {
  const api = useContext(ApiContext);
  if (!api) throw new Error("useApi must be used within ApiProvider");
  return api;
}
