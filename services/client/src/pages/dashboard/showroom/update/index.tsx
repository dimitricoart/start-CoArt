import { FC, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router";

import { useApi } from "@framework/mui-form";
import { PageHeader, ProgressOverlay } from "../../../../components/page-layout";
import type { IShowroom, IShowroomUpdateDto } from "@framework/types";

import { ShowroomFields } from "../create/fields";
import { ROUTES } from "../../../../routes/routes";
import { StyledPageRoot } from "../../../../components/styled";

export const ShowroomUpdate: FC = () => {
  const { showroomId } = useParams<{ showroomId: string }>();

  const api = useApi();
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const { data: showroom, isLoading } = useQuery({
    queryKey: ["showroom"],
    queryFn: (): Promise<IShowroom> => {
      return api.fetchJson({
        url: `/showrooms/${showroomId}`,
      });
    },
  });

  const handleSubmit = async (values: IShowroomUpdateDto) => {
    // need to filter fields because in fact this is complete IShowroom object
    const { title, subtitle, description, imageUrl } = values;
    return api.fetchJson({
      url: `/showrooms/${showroomId}`,
      method: "PUT",
      data: { title, subtitle, description, imageUrl },
    });
  };

  return (
    <StyledPageRoot component="section">
      <PageHeader
        sx={{ margin: 0, mb: 4 }}
        message="pages.dashboard.showrooms.update.title"
        data={{ i: (value: ReactNode[]) => <i className="Page-HeaderTitle">{value}</i> }}
      />

      <ProgressOverlay isLoading={isLoading}>
        {showroom ? (
          <ShowroomFields
            initialValues={showroom}
            onSubmit={handleSubmit}
            onSuccess={() => {
              enqueueSnackbar(formatMessage({ id: "snackbar.updated" }), { variant: "success" });
              void navigate(ROUTES.DASHBOARD_SHOWROOM_LIST);
            }}
          />
        ) : null}
      </ProgressOverlay>
    </StyledPageRoot>
  );
};
