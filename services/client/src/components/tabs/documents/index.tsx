import { FC } from "react";
import { IconButton, Table, TableCell, TableRow } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { openUrlOnClick } from "../../../libs/open-url-on-click";
import { IDocument } from "@framework/types";

import { StyledTableBody, StyledTableContainer, StyledTableHead } from "../../styled";
import { EyeIcon } from "../../../shared";
import { EmptyList } from "../../empty";

interface IDocumentsTabContentProps {
  documents: Array<IDocument>;
}

export const DocumentsTabContent: FC<IDocumentsTabContentProps> = ({ documents }) => {
  if (!documents.length) {
    return <EmptyList />;
  }

  return (
    <StyledTableContainer
      sx={theme => ({ padding: theme.spacing(4, 6), width: "100%", maxWidth: "100%", overflowX: "hidden" })}
    >
      <Table aria-label="simple table">
        <StyledTableHead>
          <TableRow
            sx={{
              "& .MuiTableCell-head": { paddingBottom: 3, borderBottom: "none" },
            }}
          >
            <TableCell align={"left"}>
              <FormattedMessage id="pages.asset.view.documents.files" />
            </TableCell>
            <TableCell align={"right"}>
              <FormattedMessage id="pages.asset.view.documents.view" />
            </TableCell>
          </TableRow>
        </StyledTableHead>
        <StyledTableBody>
          {documents.map((d, i) => (
            <TableRow
              key={d.uuid ?? `doc-${i}`}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& .MuiTableCell-body": { paddingTop: 3, paddingBottom: 3 },
              }}
            >
              <TableCell align="left">{d.caption}</TableCell>
              <TableCell align="right">
                <IconButton onClick={openUrlOnClick(d.fileUrl)}>
                  <EyeIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </StyledTableBody>
      </Table>
    </StyledTableContainer>
  );
};
