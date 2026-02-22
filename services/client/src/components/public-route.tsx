import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router";

import { useUser } from "../libs/providers/user-provider";
import { ROUTES } from "../routes/routes";

export const Public: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();
  if (isLoading) return null;
  if (isAuthenticated()) return <Navigate to={ROUTES.DASHBOARD} replace />;
  return <>{children}</>;
};
