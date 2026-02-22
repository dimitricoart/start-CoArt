import { ChangeEvent, useLayoutEffect } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { IPaginationResult, IPaginationDto } from "@framework/types";
import { defaultItemsPerPage } from "@framework/constants";

import { useApi } from "../context/api";

type TInitialValues<V extends Record<string, any>> = V & Partial<IPaginationDto>;

const defaultValues: TInitialValues<IPaginationDto> = {
  take: defaultItemsPerPage,
  skip: 0,
};

interface IUseFetchQueryOptions {
  syncInitialToSearch?: boolean;
}

export const useFetchQuery = <S extends Record<string, any>, V extends Record<string, any> = Record<string, any>>(
  queryKey: string,
  initialValues?: TInitialValues<V>,
  { syncInitialToSearch = true }: IUseFetchQueryOptions = {},
) => {
  const api = useApi();

  const [search, setSearch] = useSearchParams();
  const searchObj = Object.fromEntries(search.entries());

  const params = {
    ...defaultValues,
    ...initialValues,
    ...searchObj,
  };

  const take = Number(params.take);
  const skip = Number(params.skip);

  useLayoutEffect(() => {
    if (!syncInitialToSearch) return;

    if (Object.keys(searchObj).length === 0) {
      setSearch(
        {
          take: String(params.take),
          skip: String(params.skip),
        },
        { replace: true },
      );
    }
  }, [syncInitialToSearch, searchObj, setSearch, params]);

  const queryData = useQuery({
    queryKey: [queryKey, params],
    queryFn: (): Promise<IPaginationResult<S>> => {
      return api.fetchJson<IPaginationResult<S>>({
        url: `/${queryKey}`,
        data: params,
      });
    },
  });

  const onChangePage = (_e: ChangeEvent<unknown>, page: number) => {
    setSearch(prev => ({
      ...Object.fromEntries(prev.entries()),
      skip: String((page - 1) * take),
    }));
  };

  return {
    ...queryData,
    take,
    skip,
    onChangePage,
  };
};
