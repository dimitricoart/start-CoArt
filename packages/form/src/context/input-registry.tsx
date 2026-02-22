import { createContext, FC, PropsWithChildren, useContext } from "react";

export interface IRegisteredInput {
  name: string;
  isAsync: boolean;
}

type SetRegisteredInputs = React.Dispatch<React.SetStateAction<IRegisteredInput[]>>;

const InputRegistryContext = createContext<{
  registeredInputs: IRegisteredInput[];
  setRegisteredInputs: SetRegisteredInputs;
} | null>(null);

export const InputRegistryProvider: FC<
  PropsWithChildren<{
    registeredInputs: IRegisteredInput[];
    setRegisteredInputs: SetRegisteredInputs;
  }>
> = ({ registeredInputs, setRegisteredInputs, children }) => (
  <InputRegistryContext.Provider value={{ registeredInputs, setRegisteredInputs }}>
    {children}
  </InputRegistryContext.Provider>
);

export function useInputRegistry(): { registeredInputs: IRegisteredInput[]; setRegisteredInputs: SetRegisteredInputs } {
  const ctx = useContext(InputRegistryContext);
  if (!ctx) throw new Error("useInputRegistry must be used within InputRegistryProvider");
  return ctx;
}
