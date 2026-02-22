import { FormattedMessage } from "react-intl";
import { Grid, Table, TableCell, TableRow, Typography, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";

import { IProvenance } from "@framework/types";
import { ProgressOverlay } from "../../page-layout";
import { useApi } from "@framework/mui-form";
import type { IPaginationResult } from "@framework/types";

import { StyledTableBody, StyledTableCard, StyledTableContainer, StyledTableHead } from "../../styled";
import { sizeDecreaseCalc } from "../../../utils/sizeDecrease";
import { ROUTES } from "../../../routes/routes";
import { tableBodyData, tableHeadData, TBodyData, THeadData } from "./schemas";
import { EmptyList } from "../../empty";

interface IProvenanceProps {
  merchantId: string;
  assetId?: string;
}

export const ProvenanceTabContent = (props: IProvenanceProps) => {
  const { merchantId, assetId } = props;

  const api = useApi();

  const isMd = useMediaQuery(theme => theme.breakpoints.down("md"));

  const { data: provenance, isLoading } = useQuery({
    queryKey: ["provenance"],
    queryFn: (): Promise<IPaginationResult<IProvenance>> => {
      return api.fetchJson({
        url: `/provenance`,
        data: { merchantId, assetId },
      });
    },
    enabled: true,
  });

  if (!provenance?.rows?.length) {
    return <EmptyList />;
  }

  const tableHead: THeadData = assetId
    ? tableHeadData
    : [{ id: "pages.asset.view.provenance.asset", align: "left" }, ...tableHeadData];

  const tableBody: TBodyData = assetId
    ? tableBodyData
    : [
        row => ({
          content: (
            <Fragment>
              <RouterLink className="Link" to={ROUTES.ASSET_VIEW.replace(":assetId", row.asset!.id)}>
                {row.asset?.title}
              </RouterLink>
              {row.asset?.artistName && <Typography>{row.asset?.artistName}</Typography>}
            </Fragment>
          ),
          align: "left",
        }),
        ...tableBodyData,
      ];

  return (
    <Grid display="flex" flexDirection="column" alignItems="flex-start" gap={{ xs: 2.5, sm: 2.5, md: 5 }} size={12}>
      <Typography variant="ralewayRegular" fontSize={sizeDecreaseCalc(58, 35)} lineHeight="normal" component="h2">
        <FormattedMessage id="pages.asset.view.provenance.title" />
      </Typography>
      <ProgressOverlay isLoading={isLoading}>
        {!isMd && (
          <StyledTableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <StyledTableHead>
                <TableRow>
                  {tableHead.map(({ id, align }) => (
                    <TableCell key={id} align={align}>
                      <FormattedMessage id={id} />
                    </TableCell>
                  ))}
                </TableRow>
              </StyledTableHead>
              <StyledTableBody>
                {provenance.rows.map(row => (
                  <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    {tableBody
                      .map(callback => callback(row))
                      .map(({ content, align }, i) => (
                        <TableCell key={i} align={align}>
                          {content}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </StyledTableBody>
            </Table>
          </StyledTableContainer>
        )}
        {isMd && (
          <Fragment>
            {provenance.rows.map(p => (
              <StyledTableCard container key={p.id} size={12}>
                {tableHead.map(({ id }, i) => {
                  const { content } = tableBody[i](p);
                  return (
                    <Grid container key={id} size={12} className={"TableCard-row"}>
                      <Grid className={"MuiTableCell-head"} size={6}>
                        <FormattedMessage id={id} />
                      </Grid>
                      <Grid className={"MuiTableCell-body"} key={i} size={6}>
                        {content}
                      </Grid>
                    </Grid>
                  );
                })}
              </StyledTableCard>
            ))}
          </Fragment>
        )}
      </ProgressOverlay>
    </Grid>
  );
};
