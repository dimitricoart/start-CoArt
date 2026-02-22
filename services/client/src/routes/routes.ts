export const ROUTES = {
  MAIN: "/",
  DEFAULT: "*",

  LOGIN: "/login",
  REGISTRATION: "/registration",
  PROFILE: "/profile",
  FORGOT_PASSWORD: "/forgot-password",
  RESTORE_PASSWORD: "/restore-password",

  DASHBOARD: "/dashboard",
  DASHBOARD_ASSET_CREATE: "/dashboard/assets/new",
  DASHBOARD_ASSET_UPDATE: "/dashboard/assets/:assetId/update",
  DASHBOARD_ASSET_VALIDATION: "/dashboard/validation",
  DASHBOARD_ASSET_LIST: "/dashboard/assets",
  DASHBOARD_OFFER_CREATE: "/dashboard/offer/:assetId",
  DASHBOARD_LEDGER_LIST: "/dashboard/ledger",
  DASHBOARD_MERCHANTS: "/dashboard/merchants",
  DASHBOARD_MERCHANTS_UPDATE: "/dashboard/merchants/:merchantId/update",
  DASHBOARD_MERCHANT_UPDATE: "/dashboard/merchant",
  DASHBOARD_FAVORITES: "/dashboard/favorites",
  DASHBOARD_WALLET: "/dashboard/wallet",
  DASHBOARD_SETTINGS: "/dashboard/settings",
  DASHBOARD_SHOWROOM_UPDATE: "/dashboard/showrooms/:showroomId/update",
  DASHBOARD_SHOWROOM_CREATE: "/dashboard/showrooms/new",
  DASHBOARD_SHOWROOM_LIST: "/dashboard/showrooms",

  SHOWROOM_VIEW: "/showrooms/:showroomId",

  ASSET_LIST: "/assets",
  ASSET_SEARCH: "/assets/search",
  ASSET_VIEW: "/assets/:assetId",
  ASSET_FCC: "/assets/:assetId/fcc",

  LEDGER_VIEW: "/ledger/:ledgerId",

  PROVENANCE_LIST: "/provenance",

  MERCHANT_LIST: "/merchants",
  MERCHANT_VIEW: "/merchants/:merchantId",

  STRIPE_SUCCESS: "/stripe/success",
  STRIPE_CANCEL: "/stripe/cancel",
  PAYWALL: "/paywall/:offerId",

  TERMS_OF_USE: "/terms-of-use",
  COMMUNITY_STANDARDS: "/community-standards",
  STORAGE_POLICY: "/storage-policy",
  MESSAGE: "/message/:message",
};
