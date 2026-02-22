import { createContext, PropsWithChildren, useContext, useState } from "react";

export interface IAssetValidationState {
  isDialogOpen: boolean;
  onOpenAssetValidationDialog: (assetId: string) => void;
  onCloseAssetValidationDialog: () => void;
  assetId: string | null;
}

export const AssetValidationContext = createContext<IAssetValidationState>({
  isDialogOpen: false,
  onOpenAssetValidationDialog: () => {
    return;
  },
  onCloseAssetValidationDialog: () => {
    return;
  },
  assetId: null,
});

export const AssetValidationContextProvider = ({ children }: PropsWithChildren) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [assetId, setAssetId] = useState<string | null>(null);

  const onOpenAssetValidationDialog = (assetId: string) => {
    setIsDialogOpen(true);
    setAssetId(assetId);
  };

  const onCloseAssetValidationDialog = () => {
    setIsDialogOpen(false);
    setAssetId(null);
  };
  return (
    <AssetValidationContext.Provider
      value={{ isDialogOpen, assetId, onOpenAssetValidationDialog, onCloseAssetValidationDialog }}
    >
      {children}
    </AssetValidationContext.Provider>
  );
};

export const useAssetValidation = () => {
  return useContext(AssetValidationContext);
};
