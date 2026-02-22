import { AssetStatus } from "@framework/types";

import { AlertIcon } from "../../../shared";

export const assetAlertTitle: Record<
  Exclude<AssetStatus, AssetStatus.APPROVED | AssetStatus.FINALIZED | AssetStatus.NEW>,
  Record<"title" | "icon" | "severity", any>
> = {
  [AssetStatus.DECLINED]: {
    title: "pages.asset.alert.declined",
    icon: <AlertIcon />,
    severity: "warning",
  },
  [AssetStatus.REJECTED]: {
    title: "pages.asset.alert.rejected",
    icon: <AlertIcon />,
    severity: "error",
  },
};
