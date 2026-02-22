import { PropsWithChildren, useEffect } from "react";
import { Collapse, Grid } from "@mui/material";
import { FieldValues, FormProvider, useForm, WatchObserver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";

import { TestIdProvider } from "../context/test-id";
import { SearchInput } from "../components/search-input";

interface ICommonSearchFormProps extends PropsWithChildren {
  initialValues: Record<string, string | Array<string>>;
  onHandleSearch?: (values: any) => void;
  open?: boolean;
  name?: string;
  validationSchema?: any;
}

export const CommonSearchForm = (props: ICommonSearchFormProps) => {
  const { initialValues, name = "query", open = false, validationSchema, children } = props;
  const [search, setSearch] = useSearchParams(initialValues);

  const resolver = validationSchema ? yupResolver(validationSchema) : undefined;

  const form = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver,
  });

  const formObserver: WatchObserver<FieldValues> = useDebouncedCallback((values, info) => {
    if (info.type === "change") {
      if (!!info.name && !values[info.name]) {
        search.delete(info.name);
      }
      const preparedValues = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => Boolean(value)),
      ) as Record<string, string | Array<string>>;

      setSearch(prev => ({
        ...Object.fromEntries(prev.entries()),
        ...preparedValues,
      }));
    }
  }, 300);

  useEffect(() => {
    const subscription = form.watch(formObserver);
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <TestIdProvider testId={name}>
      <FormProvider {...form}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12 }}>
            <SearchInput name={name} data-testid="CommonSearchInput" />
          </Grid>
        </Grid>
        <Collapse in={open}>{children}</Collapse>
      </FormProvider>
    </TestIdProvider>
  );
};
