import { ChangeEvent, FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { InputBase } from "@mui/material";
import { useIntl } from "react-intl";

import { PageHeader, ProgressOverlay } from "../../../components/page-layout";
import { ILedger } from "@framework/types";

import { LedgerGrid } from "../../dashboard/ledger/list/grid";
import { useTypesense } from "../../../libs/useTypesense";
import { StyledPageRoot } from "../../../components/styled";
import { CONTENT_WIDTH } from "../../../shared";
import { StyledSearchRoot } from "../../../components/styled/search";
import { useDebounce } from "../../../libs/debounce";

export const LedgerSearch: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { formatMessage } = useIntl();

  const [ledgers, setLedgers] = useState<Array<ILedger>>([]);
  const { fetchSearchResults, isLoading } = useTypesense();

  const query = searchParams.get("query") || "";

  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const debouncedQuery = useDebounce(inputValue.trim(), 400);

  useEffect(() => {
    const fetch = async (query: string) => {
      const result = await fetchSearchResults(query);
      setLedgers(result);
    };

    void fetch(debouncedQuery);
  }, [debouncedQuery]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setInputValue(next);

    const trimmed = next.trim();
    setSearchParams(
      prev => {
        const p = new URLSearchParams(prev);
        if (trimmed) p.set("query", trimmed);
        else p.delete("query");
        return p;
      },
      { replace: true },
    );
  };

  return (
    <StyledPageRoot
      sx={theme => ({
        width: CONTENT_WIDTH,
        margin: "0 auto",
        [theme.breakpoints.down("md")]: {
          width: "100%",
          margin: 0,
        },
      })}
    >
      <PageHeader message="pages.asset.search.title" />

      <ProgressOverlay isLoading={isLoading}>
        <StyledSearchRoot sx={{ mb: 5 }} $isHeader={false}>
          <InputBase
            autoFocus
            value={inputValue}
            onChange={onSearchChange}
            placeholder={formatMessage({ id: "form.placeholders.assetName" })}
          />
        </StyledSearchRoot>

        {ledgers?.length ? <LedgerGrid ledgers={ledgers} /> : null}
      </ProgressOverlay>
    </StyledPageRoot>
  );
};
