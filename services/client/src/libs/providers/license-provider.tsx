import { FC, PropsWithChildren } from "react";

export const LicenseProvider: FC<PropsWithChildren<{ licenseKey?: string }>> = ({ children }) => <>{children}</>;
