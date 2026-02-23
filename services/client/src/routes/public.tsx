import { lazy, Suspense } from "react";
import { RouteObject } from "react-router";

import { Public } from "../components/public-route";

import { Login } from "../pages/auth/login";
import { Registration } from "../pages/auth/registration";
import { ForgotPassword } from "../pages/auth/forgot-password";
import { RestorePassword } from "../pages/auth/restore-password";
import { Landing } from "../pages/landing";
import { ShowroomView } from "../pages/showroom/view";
import { MerchantList } from "../pages/merchant/list";
import { MerchantView } from "../pages/merchant/view";
import { ProvenanceList } from "../pages/provenance/list";
import { StripeCancel } from "../pages/stripe/cancel";
import { StripeSuccess } from "../pages/stripe/success";
import { ROUTES } from "./routes";

// Lazy-load routes that pull in react-pdf or typesense to avoid undefined module in main chunk
const AssetView = lazy(() => import("../pages/asset/view").then(m => ({ default: m.AssetView })));
const LedgerSearch = lazy(() => import("../pages/ledger/search").then(m => ({ default: m.LedgerSearch })));
const LedgerView = lazy(() => import("../pages/ledger/view").then(m => ({ default: m.LedgerView })));
const Paywall = lazy(() => import("../pages/paywall").then(m => ({ default: m.Paywall })));

export const publicRoutes: Array<RouteObject> = [
  {
    index: true,
    Component: Landing,
  },

  {
    path: ROUTES.LOGIN,
    element: (
      <Public>
        <Login />
      </Public>
    ),
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: (
      <Public>
        <ForgotPassword />
      </Public>
    ),
  },
  {
    path: ROUTES.RESTORE_PASSWORD,
    element: (
      <Public>
        <RestorePassword />
      </Public>
    ),
  },
  {
    path: ROUTES.REGISTRATION,
    element: (
      <Public>
        <Registration />
      </Public>
    ),
  },

  // Guest routes (public)
  {
    path: ROUTES.SHOWROOM_VIEW,
    Component: ShowroomView,
  },

  {
    path: ROUTES.PROVENANCE_LIST,
    Component: ProvenanceList,
  },

  {
    path: ROUTES.MERCHANT_LIST,
    Component: MerchantList,
  },
  {
    path: ROUTES.MERCHANT_VIEW,
    Component: MerchantView,
  },

  {
    path: ROUTES.ASSET_VIEW,
    element: (
      <Suspense fallback={null}>
        <AssetView />
      </Suspense>
    ),
  },
  {
    path: ROUTES.ASSET_SEARCH,
    element: (
      <Suspense fallback={null}>
        <LedgerSearch />
      </Suspense>
    ),
  },
  {
    path: ROUTES.LEDGER_VIEW,
    element: (
      <Suspense fallback={null}>
        <LedgerView />
      </Suspense>
    ),
  },

  {
    path: ROUTES.STRIPE_SUCCESS,
    Component: StripeSuccess,
  },
  {
    path: ROUTES.STRIPE_CANCEL,
    Component: StripeCancel,
  },
  {
    path: ROUTES.PAYWALL,
    element: (
      <Suspense fallback={null}>
        <Paywall />
      </Suspense>
    ),
  },
];
