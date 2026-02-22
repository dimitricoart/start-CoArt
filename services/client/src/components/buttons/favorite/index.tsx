import { FC } from "react";
import { RefetchOptions, useMutation } from "@tanstack/react-query";

import { useApi } from "@framework/mui-form";

import { StyledIconButton } from "./styled";
import { FavoriteIcon } from "../../../shared";

interface IFavoriteButtonProps {
  assetId: string;
  active: boolean;
  refetch: (options?: RefetchOptions) => Promise<any>;
}

export const FavoriteButton: FC<IFavoriteButtonProps> = props => {
  const { assetId, active, refetch } = props;

  const api = useApi();

  const { mutate: favoriteAsset, isPending } = useMutation({
    mutationFn: (): Promise<any> => {
      return api.fetchJson({
        method: active ? "DELETE" : "POST",
        url: `/favorites/${assetId}`,
      });
    },
    onSuccess: () => {
      void refetch();
    },
    onError: e => {
      console.error(e);
    },
  });

  const onClickIcon = () => {
    void favoriteAsset();
  };

  return (
    <StyledIconButton disabled={isPending} $active={active} onClick={onClickIcon}>
      <FavoriteIcon />
    </StyledIconButton>
  );
};
