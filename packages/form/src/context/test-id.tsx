import { createContext, FC, PropsWithChildren, useContext } from "react";

const TestIdContext = createContext<string | undefined>(undefined);

export const TestIdProvider: FC<PropsWithChildren<{ testId?: string }>> = ({ testId, children }) => (
  <TestIdContext.Provider value={testId}>{children}</TestIdContext.Provider>
);

export function useTestId(): string | undefined {
  return useContext(TestIdContext);
}
