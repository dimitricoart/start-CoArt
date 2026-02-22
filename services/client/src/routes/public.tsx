import { RouteObject } from "react-router";

import { Public } from "../components/public-route";

import { Login } from "../pages/auth/login";
import { Registration } from "../pages/auth/registration";
import { ForgotPassword } from "../pages/auth/forgot-password";
import { RestorePassword } from "../pages/auth/restore-password";
import { Landing } from "../pages/landing";
import { ShowroomView } from "../pages/showroom/view";
import { AssetView } from "../pages/asset/view";
import { LedgerSearch } from "../pages/ledger/search";
import { MerchantList } from "../pages/merchant/list";
import { MerchantView } from "../pages/merchant/view";
import { ProvenanceList } from "../pages/provenance/list";
import { StripeCancel } from "../pages/stripe/cancel";
import { StripeSuccess } from "../pages/stripe/success";
import { Paywall } from "../pages/paywall";
import { ROUTES } from "./routes";
import { LedgerView } from "../pages/ledger/view";

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
    Component: AssetView,
  },
  {
    path: ROUTES.ASSET_SEARCH,
    Component: LedgerSearch,
  },

  {
    path: ROUTES.LEDGER_VIEW,
    Component: LedgerView,
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
    Component: Paywall,
  },
];
