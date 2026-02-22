import { AssetStatus } from "@framework/types";

export enum RejectAssetOptions {
  REJECT = "REJECT",
  DECLINE = "DECLINE",
}

export const convertAssetStatus: Record<RejectAssetOptions, AssetStatus> = {
  [RejectAssetOptions.DECLINE]: AssetStatus.DECLINED,
  [RejectAssetOptions.REJECT]: AssetStatus.REJECTED,
};
