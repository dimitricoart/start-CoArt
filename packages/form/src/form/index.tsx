import { FC, PropsWithChildren, RefObject, useState } from "react";
import { Box } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useIntl } from "react-intl";
import { useSnackbar } from "notistack";

import { TestIdProvider } from "../context/test-id";
import { InputRegistryProvider } from "../context/input-registry";
import { useDeepCompareEffect } from "../utils/use-deep-compare-effect";
import { getLocalizedValidationErrors, IApiError } from "../utils/api-error";

import { FormButtons } from "../buttons";
import { PromptIfDirty } from "../prompt";

export interface IRenderFormButtonsProps {
  isLoading: boolean;
  disabled?: boolean;
}

interface IFormWrapperProps<T> {
  showButtons?: boolean;
  showPrompt?: boolean;
  submit?: string;
  onSubmit: (values: T, event?: React.BaseSyntheticEvent<object, any, any>) => Promise<any>;
  initialValues: T;
  enableReinitialize?: boolean;
  innerRef?: RefObject<HTMLFormElement | null>;
  validationSchema?: any;
  name: string;
  renderButtons?: (props: IRenderFormButtonsProps) => React.JSX.Element;
  onSuccess?: (value: any) => void;
}

export interface IRegisteredInput {
  name: string;
  isAsync: boolean;
}

export const FormWrapper: FC<PropsWithChildren<IFormWrapperProps<any>>> = props => {
  const {
    children,
    initialValues,
    enableReinitialize = true,
    onSubmit,
    showPrompt = true,
    showButtons,
    submit,
    innerRef,
    validationSchema,
    name,
    renderButtons,
    onSuccess,
  } = props;

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const [registeredInputs, setRegisteredInputs] = useState<IRegisteredInput[]>([]);

  const resolver = validationSchema ? yupResolver(validationSchema) : undefined;

  const form = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver,
  });

  const { isSubmitting } = form.formState;

  const buttonDisabled = isSubmitting;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (form: { data: any; event?: React.BaseSyntheticEvent<object, any, any> }) => {
      return onSubmit(form.data, form.event);
    },
    onSuccess,
    onError: (e: unknown) => {
      const err = e as IApiError;
      const errors = getLocalizedValidationErrors(e);
      if (Object.keys(errors).length > 0) {
        Object.keys(errors).forEach(key => {
          form?.setError(key, { type: "custom", message: errors[key] });
        });
      } else if (err?.status) {
        enqueueSnackbar(formatMessage({ id: `snackbar.${err.message ?? "error"}` }), { variant: "error" });
      } else {
        console.error(e);
        enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
      }
    },
  });

  const handleSubmit: SubmitHandler<any> = async (data, event): Promise<void> => {
    await mutateAsync({ data, event });
    form.reset(data);
    // do not use mutateAsync because it will end up in RHF error handler
    // while we want to end up in onError handler
    // return mutateAsync(data);
  };

  useDeepCompareEffect(() => {
    if (enableReinitialize) {
      form.reset(initialValues, { keepDirtyValues: true });
    }
  }, [enableReinitialize, initialValues]);

  const testIdProps = name ? { "data-testid": `${name}-form` } : {};

  return (
    <TestIdProvider testId={name}>
      <InputRegistryProvider registeredInputs={registeredInputs} setRegisteredInputs={setRegisteredInputs}>
        <FormProvider {...form}>
          <Box
            component="form"
            className="FormWrapper-root"
            onSubmit={form.handleSubmit(handleSubmit)}
            ref={innerRef}
            {...testIdProps}
          >
            {showPrompt && <PromptIfDirty />}
            {children}
            {renderButtons?.({ isLoading: isPending, disabled: buttonDisabled })}
            <FormButtons visible={showButtons} submit={submit} isLoading={isPending} />
          </Box>
        </FormProvider>
      </InputRegistryProvider>
    </TestIdProvider>
  );
};
