import { FC, ReactNode } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { PageHeader, ProgressOverlay } from "../../../../components/page-layout";
import { useApi } from "@framework/mui-form";
import { useUser } from "../../../../libs/providers/user-provider";
import { IMerchant, IMerchantUpdateDto, IUser } from "@framework/types";

import { ROUTES } from "../../../../routes/routes";
import { StyledPageRoot } from "../../../../components/styled";
import { MerchantFields } from "./fields";

export const MerchantUpdate: FC = () => {
  const user = useUser<IUser>();
  const { merchantId = user.profile.merchant?.id } = useParams<{ merchantId: string }>();

  const api = useApi();

  const { data: merchant, isLoading } = useQuery({
    queryKey: ["merchants", merchantId],
    queryFn: (): Promise<IMerchant> => {
      return api.fetchJson({
        url: `/merchants/${merchantId}`,
      });
    },
    enabled: true,
    refetchOnMount: "always",
  });

  const onSubmit = async (values: IMerchantUpdateDto) => {
    const { title, subtitle, description, imageUrl, backgroundImageUrl } = values;
    return api.fetchJson({
      url: `/merchants/${merchantId}`,
      method: "PUT",
      data: { title, subtitle, description, imageUrl, backgroundImageUrl },
    });
  };

  if (!merchant) {
    return null;
  }

  const initialValues: IMerchantUpdateDto = merchant;

  return (
    <StyledPageRoot component="section">
      <PageHeader
        message={`pages.dashboard.merchants.update.title`}
        data={{ i: (value: ReactNode[]) => <i className="Page-HeaderTitle">{value}</i> }}
      />
      <ProgressOverlay isLoading={isLoading}>
        <MerchantFields initialValues={initialValues} onSubmit={onSubmit} redirect={ROUTES.DASHBOARD} />
      </ProgressOverlay>
    </StyledPageRoot>
  );
};
