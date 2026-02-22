import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router";

import { useUser } from "../libs/providers/user-provider";
import { ROUTES } from "../routes/routes";

export const Protected: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) return null;
  if (!isAuthenticated()) return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  return <>{children}</>;
};
