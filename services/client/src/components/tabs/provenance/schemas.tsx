import { ReactNode } from "react";
import { format } from "date-fns";
import { FormattedNumber } from "react-intl";
import { TableCellProps } from "@mui/material";

import { IProvenance } from "@framework/types";

export type THeadData = Array<{ id: string; align: TableCellProps["align"] }>;
export type TBodyData = Array<(row: IProvenance) => { content: ReactNode; align: TableCellProps["align"] }>;

export const tableHeadData: THeadData = [
  { id: "pages.asset.view.provenance.seller", align: "left" },
  { id: "pages.asset.view.provenance.buyer", align: "left" },
  { id: "pages.asset.view.provenance.fractions", align: "right" },
  { id: "pages.asset.view.provenance.price", align: "right" },
  { id: "pages.asset.view.provenance.createdAt", align: "right" },
];

export const tableBodyData: TBodyData = [
  row => ({
    content: row.seller?.title,
    align: "left",
  }),
  row => ({
    content: row.buyer?.title,
    align: "left",
  }),
  row => ({
    content: <FormattedNumber value={row.fractions} />,
    align: "right",
  }),
  row => ({
    content: (
      <FormattedNumber
        value={row.price}
        style="currency"
        currency="EUR"
        minimumFractionDigits={0}
        maximumFractionDigits={0}
      />
    ),
    align: "right",
  }),
  row => ({
    content: format(new Date(row.createdAt), "yyyy-MM-dd HH:mm"),
    align: "right",
  }),
];
