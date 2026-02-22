import { FC, ReactNode } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { useIntl } from "react-intl";

import { emptyStateString } from "../../../../libs/lexical-utils";
import type { IShowroomCreateDto } from "@framework/types";
import { useApi } from "@framework/mui-form";
import { PageHeader } from "../../../../components/page-layout";

import { StyledPageRoot } from "../../../../components/styled";
import { ROUTES } from "../../../../routes/routes";
import { ShowroomFields } from "./fields";

export const ShowroomCreate: FC = () => {
  const api = useApi();
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const onSubmit = async (values: IShowroomCreateDto) => {
    const { title, description, imageUrl } = values;
    return api.fetchJson({
      url: "/showrooms",
      method: "POST",
      data: { title, description, imageUrl },
    });
  };

  const initialValues = {
    title: "",
    subtitle: emptyStateString,
    description: emptyStateString,
    imageUrl: "",
    backgroundImageUrl: "",
  };

  return (
    <StyledPageRoot>
      <PageHeader
        message="pages.dashboard.showrooms.create.title"
        data={{ i: (value: ReactNode[]) => <i className="Page-HeaderTitle">{value}</i> }}
      />

      <ShowroomFields
        initialValues={initialValues}
        onSubmit={onSubmit}
        onSuccess={() => {
          enqueueSnackbar(formatMessage({ id: "snackbar.updated" }), { variant: "success" });
          void navigate(ROUTES.DASHBOARD_SHOWROOM_LIST);
        }}
      />
    </StyledPageRoot>
  );
};
