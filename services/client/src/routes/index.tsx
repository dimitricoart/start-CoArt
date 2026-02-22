import { FC } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import { ROUTES } from "./routes";
import { Providers } from "../app";
import { Layout } from "../components/layout";
import { Test } from "../pages/test";
import { TermsOfUse } from "../pages/legal/terms-of-use";
import { CommunityStandards } from "../pages/legal/community-standards";
import { Message } from "../pages/message";
import { StoragePolicy } from "../pages/legal/storage-policy";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: (
      <Providers>
        <Layout />
      </Providers>
    ),
    children: [
      ...publicRoutes,
      ...protectedRoutes,
      {
        path: "/test",
        Component: Test,
      },

      {
        path: ROUTES.MESSAGE,
        Component: Message,
      },
      {
        path: ROUTES.TERMS_OF_USE,
        Component: TermsOfUse,
      },
      {
        path: ROUTES.COMMUNITY_STANDARDS,
        Component: CommunityStandards,
      },
      {
        path: ROUTES.STORAGE_POLICY,
        Component: StoragePolicy,
      },
      {
        path: ROUTES.DEFAULT,
        element: <Navigate to="/message/page-not-found" />,
      },
    ],
  },
]);

export const App: FC = () => {
  return <RouterProvider router={router} />;
};
