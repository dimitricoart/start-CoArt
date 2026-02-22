import React, { FC } from "react";
import { Controller, get, useFormContext } from "react-hook-form";
import { useIntl } from "react-intl";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
} from "@mui/material";

type BaseProps = { name: string; showLabel?: boolean; label?: string };

const useFieldError = (name: string) => {
  const form = useFormContext();
  return get(form.formState.errors, name) as { message?: string } | undefined;
};

const isI18nKey = (msg: string) => typeof msg === "string" && (msg.startsWith("form.") || msg.includes("."));

export const TextInput: FC<BaseProps & Omit<TextFieldProps, "name">> = ({ name, showLabel, label, ...rest }) => {
  const form = useFormContext();
  const { formatMessage } = useIntl();
  const error = useFieldError(name);
  const helperText = error?.message
    ? isI18nKey(error.message)
      ? formatMessage(
          { id: error.message, defaultMessage: error.message },
          { label: formatMessage({ id: `form.labels.${name}`, defaultMessage: name }) },
        )
      : error.message
    : undefined;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          error={!!error}
          helperText={helperText}
          label={showLabel !== false && label}
          variant={rest.variant ?? "outlined"}
          {...rest}
        />
      )}
    />
  );
};

export const PasswordInput: FC<BaseProps & Omit<TextFieldProps, "name">> = props => (
  <TextInput {...props} type="password" autoComplete={props.autoComplete ?? "current-password"} />
);

export const TextArea: FC<BaseProps & Omit<TextFieldProps, "name">> = props => (
  <TextInput {...props} multiline minRows={3} />
);

export const CheckboxInput: FC<BaseProps & { [k: string]: any }> = ({
  name,
  showLabel,
  label,
  disableRipple,
  icon,
  checkedIcon,
  ...rest
}) => {
  const form = useFormContext();
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { value, onChange, ...f } }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...f}
              checked={!!value}
              onChange={e => onChange(e.target.checked)}
              disableRipple={disableRipple}
              icon={icon}
              checkedIcon={checkedIcon}
            />
          }
          label={showLabel !== false ? label ?? name : undefined}
          {...rest}
        />
      )}
    />
  );
};

function normalizeOptions(
  options: Array<{ value: string | number; label: string }> | Record<string, string | number> | undefined,
): Array<{ value: string | number; label: string }> {
  if (!options) return [];
  if (Array.isArray(options)) return options;
  return Object.entries(options).map(([k, v]) => ({ value: v, label: k }));
}

export const SelectInput: FC<
  BaseProps & {
    options?: Array<{ value: string | number; label: string }> | Record<string, string | number>;
    [k: string]: any;
  }
> = ({ name, showLabel, label, options, ...rest }) => {
  const form = useFormContext();
  const { formatMessage } = useIntl();
  const error = useFieldError(name);
  const opts = normalizeOptions(options);
  const helperText = error?.message
    ? isI18nKey(error.message)
      ? formatMessage(
          { id: error.message, defaultMessage: error.message },
          { label: formatMessage({ id: `form.labels.${name}`, defaultMessage: name }) },
        )
      : error.message
    : undefined;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl fullWidth variant="outlined" error={!!error} {...rest}>
          {showLabel !== false && (
            <InputLabel id={`${name}-label`}>{typeof label === "string" ? label : name}</InputLabel>
          )}
          <Select {...field} labelId={`${name}-label`} label={showLabel !== false ? label ?? name : undefined}>
            {opts.map(opt => (
              <MenuItem key={String(opt.value)} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export const NumberInput: FC<BaseProps & Omit<TextFieldProps, "name">> = props => (
  <TextInput {...props} type="number" />
);

export const CurrencyInput: FC<BaseProps & Omit<TextFieldProps, "name">> = props => (
  <TextInput {...props} type="number" inputProps={{ inputMode: "decimal" }} />
);

export const DateInput: FC<BaseProps & Omit<TextFieldProps, "name">> = props => (
  <TextInput {...props} type="date" InputLabelProps={{ shrink: true }} />
);

export const LexicalTextEditor: FC<BaseProps & { required?: boolean; controls?: object; [k: string]: any }> = ({
  name,
  showLabel,
  label,
  ...rest
}) => (
  <TextInput name={name} showLabel={showLabel} label={label} multiline minRows={4} {...rest} />
);

export const EntityInput: FC<BaseProps & { [k: string]: any }> = props => <TextInput {...props} />;
