import { FC, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Controller, get, useFormContext, useWatch } from "react-hook-form";
import { FormHelperText, Grid, InputLabel, Typography } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";
import { enqueueSnackbar } from "notistack";

import { useTestId } from "@framework/mui-form";

import { StyledFormControl, StyledImage, StyledOptionsBlock } from "../styled";
import { SizeIcon, UploadImageIcon, UploadFileIcon, UploadVideoIcon } from "../../../../shared";
import { humanFileSize } from "../utils";
import { MAX_FILE_SIZE, MIN_FILE_SIZE } from "../constants";
import { useGcpUploader } from "../use-gcp-uploader";
import { IGcpResponse } from "../interfaces";
import { ActionsBlock } from "../components/actions";
import { FieldWrapper } from "../components/wrapper";
import { ImageInputMode, ImageInputVariant } from "../types";

export interface IImageInputProps extends DropzoneOptions {
  name: string;
  bucket: string;
  label?: string | number | ReactElement;
  bucketUrl?: string;
  required?: boolean;
  showLabel?: boolean;
  mode?: ImageInputMode;
  variant?: ImageInputVariant;
  className?: string;
}

export const ImageInput: FC<IImageInputProps> = props => {
  const {
    name,
    label,
    accept,
    bucket,
    bucketUrl = `https://storage.googleapis.com`,
    showLabel = false,
    minSize = MIN_FILE_SIZE,
    maxSize = MAX_FILE_SIZE,
    mode = "background",
    variant = "file",
    required,
    className,
  } = props;
  const actionBlockRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionBlockWidth, setActionBlock] = useState(100);

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-FileInput` } : {};

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);
  const value = get(useWatch(), name);

  const { formatMessage } = useIntl();

  const suffix = name.split(".").pop()!;
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  useEffect(() => {
    if (actionBlockRef.current) {
      const clientWidth = actionBlockRef.current.clientWidth;
      setActionBlock(clientWidth);
    }
  }, [actionBlockRef, value]);

  const uploadFilesToGcp = useGcpUploader({
    bucket,
    onFinish: (data: IGcpResponse) => {
      form.setValue(name, `${bucketUrl}${new URL(data.signedUrl).pathname}`, { shouldTouch: true, shouldDirty: true });
      form.clearErrors(name);
      void form.trigger(name);
      setIsLoading(false);
    },
    onError: (error: Error) => {
      setIsLoading(false);
      console.error(error);
    },
  });

  const handleChange = useCallback(async (files: Array<File>): Promise<void> => {
    setIsLoading(true);
    await uploadFilesToGcp({ files });
    setIsLoading(false);
  }, []);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    console.info("acceptedFiles", acceptedFiles);
    console.info("rejectedFiles", rejectedFiles);

    if (rejectedFiles.length) {
      rejectedFiles.forEach(rejectedFile => {
        rejectedFile.errors.forEach(({ code }) => {
          enqueueSnackbar(
            formatMessage(
              { id: `components.dropzone.${code}` },
              {
                type: rejectedFile.file.type || `.${rejectedFile.file.name.split(".").pop() || ""}` || "UNKNOWN",
                accept: accept ? ([] as Array<string>).concat(...Object.values(accept)).join(", ") : "",
                size: humanFileSize(rejectedFile.file.size),
                minSize: humanFileSize(minSize),
                maxSize: humanFileSize(maxSize),
              },
            ),
            { variant: "error" },
          );
        });
      });
    }

    if (acceptedFiles.length) {
      void handleChange(acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    accept,
    minSize,
    maxSize,
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
  });

  const onDeleteHandler = () => {
    form.setValue(name, "", { shouldTouch: false, shouldDirty: true });
    void form.trigger(name);
  };

  const icon: Record<ImageInputVariant, ReactNode> = {
    file: <UploadFileIcon isActive={isDragActive} />,
    image: <UploadImageIcon isActive={isDragActive} />,
    video: <UploadVideoIcon isActive={isDragActive} />,
  };

  if (value) {
    return (
      <StyledFormControl $mode={mode} className={className} fullWidth={mode === "background"} required={required}>
        {showLabel && (
          <InputLabel sx={{ position: "static", transform: "none", mb: 2 }} id={`${name}-select-label`} shrink>
            {localizedLabel}
          </InputLabel>
        )}
        <StyledImage $mode={mode} component="img" src={value} alt={formatMessage({ id: `form.labels.${name}` })} />
        {mode === "background" && (
          <StyledOptionsBlock $mode={mode} sx={{ bottom: 20, right: actionBlockWidth + 30 }}>
            <SizeIcon />
            <Typography variant="ralewayRegular" fontSize={16} lineHeight="24px">
              <FormattedMessage id="components.image.size" values={{ width: "1150", height: "300" }} />
            </Typography>
          </StyledOptionsBlock>
        )}
        <ActionsBlock
          required={required}
          mode={mode}
          ref={actionBlockRef}
          bucket={bucketUrl}
          value={value}
          onDeleteHandler={onDeleteHandler}
        />
      </StyledFormControl>
    );
  }

  return (
    <Grid {...getRootProps()}>
      <StyledFormControl $mode={mode} className={className} fullWidth={mode === "background"} required={required}>
        {showLabel && (
          <InputLabel
            required={required}
            sx={{ position: "static", transform: "none", mb: 2 }}
            id={`${name}-select-label`}
            shrink
          >
            {localizedLabel}
          </InputLabel>
        )}
        <FieldWrapper error={Boolean(error)} isLoading={isLoading} mode={mode}>
          <Controller
            name={name}
            control={form.control}
            render={({ field: { value: _value, ...field } }) => {
              return <input {...field} {...getInputProps()} {...testIdProps} />;
            }}
          />
          {icon[variant]}
          {mode === "background" && (
            <StyledOptionsBlock $mode={mode} sx={{ bottom: 20, right: actionBlockWidth + 30 }}>
              <SizeIcon />
              <Typography variant="ralewayRegular" fontSize={16} lineHeight="24px">
                <FormattedMessage id="components.image.size" values={{ width: "1150", height: "300" }} />
              </Typography>
            </StyledOptionsBlock>
          )}
          <ActionsBlock ref={actionBlockRef} bucket={bucketUrl} value={value} open={open} mode={mode} />
          {localizedHelperText && (
            <FormHelperText id={`${name}-helper-text`} error>
              {localizedHelperText}
            </FormHelperText>
          )}
        </FieldWrapper>
      </StyledFormControl>
    </Grid>
  );
};
