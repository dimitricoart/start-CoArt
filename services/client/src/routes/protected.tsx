import { RouteObject } from "react-router";

import { Protected } from "../components/protected";

import { ROUTES } from "./routes";
import { Settings } from "../pages/dashboard/settings";
import { DashboardLayout } from "../pages/dashboard/layout";
import { Favorites } from "../pages/dashboard/favorites";
import { Wallet } from "../pages/dashboard/wallet";
import { Profile } from "../pages/profile";
import { AssetCreate } from "../pages/dashboard/assets/create";
import { AssetUpdate } from "../pages/dashboard/assets/update";
import { AssetValidation } from "../pages/dashboard/assets/validation";
import { OfferCreate } from "../pages/dashboard/offer/create";
import { LedgerList } from "../pages/dashboard/ledger/list";
import { AssetList } from "../pages/dashboard/assets/list";
import { CreateFcc } from "../pages/fcc";
import { MerchantList } from "../pages/dashboard/merchants/list";
import { MerchantUpdate } from "../pages/dashboard/merchants/update";
import { ShowroomUpdate } from "../pages/dashboard/showroom/update";
import { ShowroomCreate } from "../pages/dashboard/showroom/create";
import { ShowroomList } from "../pages/dashboard/showroom/list";

export const protectedRoutes: Array<RouteObject> = [
  {
    path: ROUTES.PROFILE,
    element: (
      <Protected>
        <Profile />
      </Protected>
    ),
  },
  {
    path: ROUTES.DASHBOARD,
    Component: DashboardLayout,
    children: [
      { index: true, Component: Settings },
      {
        path: ROUTES.DASHBOARD_SETTINGS,
        Component: Settings,
      },
      {
        path: ROUTES.DASHBOARD_FAVORITES,
        Component: Favorites,
      },
      {
        path: ROUTES.DASHBOARD_ASSET_CREATE,
        Component: AssetCreate,
      },
      {
        path: ROUTES.DASHBOARD_ASSET_UPDATE,
        Component: AssetUpdate,
      },
      {
        path: ROUTES.DASHBOARD_OFFER_CREATE,
        Component: OfferCreate,
      },
      {
        path: ROUTES.DASHBOARD_ASSET_LIST,
        Component: AssetList,
      },
      {
        path: ROUTES.DASHBOARD_ASSET_VALIDATION,
        Component: AssetValidation,
      },
      {
        path: ROUTES.DASHBOARD_MERCHANTS,
        Component: MerchantList,
      },
      {
        path: ROUTES.DASHBOARD_MERCHANTS_UPDATE,
        Component: MerchantUpdate,
      },
      {
        path: ROUTES.DASHBOARD_LEDGER_LIST,
        Component: LedgerList,
      },
      {
        path: ROUTES.DASHBOARD_WALLET,
        Component: Wallet,
      },
      {
        path: ROUTES.DASHBOARD_SHOWROOM_LIST,
        Component: ShowroomList,
      },
      {
        path: ROUTES.DASHBOARD_SHOWROOM_UPDATE,
        Component: ShowroomUpdate,
      },
      {
        path: ROUTES.DASHBOARD_SHOWROOM_CREATE,
        Component: ShowroomCreate,
      },
      {
        path: ROUTES.DASHBOARD_MERCHANT_UPDATE,
        Component: MerchantUpdate,
      },
    ],
  },

  {
    path: ROUTES.ASSET_FCC,
    element: (
      <Protected>
        <CreateFcc />
      </Protected>
    ),
  },
];
