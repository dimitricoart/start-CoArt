import { FC, ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import { Controller, get, useFormContext, useWatch } from "react-hook-form";
import { FormHelperText, Grid, InputLabel } from "@mui/material";
import { useIntl } from "react-intl";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";
import { enqueueSnackbar } from "notistack";

import { useTestId } from "@framework/mui-form";

import { useGcpUploader } from "../use-gcp-uploader";
import { IGcpResponse } from "../interfaces";
import { MAX_FILE_SIZE, MIN_FILE_SIZE } from "../constants";
import { getFileType, humanFileSize } from "../utils";
import { StyledFormControl } from "../styled";
import { FieldWrapper } from "../components/wrapper";
import { ActionsBlock } from "../components/actions";
import { InstanceIdContext } from "../context";
import { GalleryItem } from "../components/gallery-item";
import { FileType, ImageInputVariant } from "../types";
import { UploadFileIcon, UploadImageIcon, UploadVideoIcon } from "../../../../shared";

function getInstanceId() {
  return Symbol("instance-id");
}

export interface IGalleryInputProps extends DropzoneOptions {
  name: string;
  bucket: string;
  label?: string | number | ReactElement;
  bucketUrl?: string;
  required?: boolean;
  showLabel?: boolean;
  className?: string;
  hasCaption?: boolean;
  variant?: ImageInputVariant;
  urlKey?: string;
  fileType?: FileType;
  minCount?: number;
}

export const GalleryInput: FC<IGalleryInputProps> = props => {
  const {
    name,
    label,
    accept,
    bucket,
    bucketUrl = `https://storage.googleapis.com`,
    showLabel = false,
    hasCaption = false,
    urlKey = "imageUrl",
    variant = "file",
    minSize = MIN_FILE_SIZE,
    maxSize = MAX_FILE_SIZE,
    required,
    className,
    minCount,
  } = props;

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);
  const value: Array<{ [urlKey]: string; caption: string }> = get(useWatch(), name);

  const { formatMessage } = useIntl();
  const [isLoading, setIsLoading] = useState(false);
  const [instanceId] = useState(getInstanceId);

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-FileInput` } : {};

  const suffix = name.split(".").pop()!;
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;

  const localizedHelperText =
    error && !Array.isArray(error) ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  const handleDeleteConfirm = (index: number) => {
    const newValue = get(form.getValues(), name);
    newValue.splice(index, 1);

    form.setValue(name, newValue, { shouldTouch: false, shouldDirty: true });
    void form.trigger(name);
  };

  const uploadFilesToGcp = useGcpUploader({
    bucket,
    onFinish: (data: IGcpResponse) => {
      const url = `${bucketUrl}${new URL(data.signedUrl).pathname}`;
      const fileType = getFileType(url);
      const values = get(form.getValues(), name);
      if (!fileType) {
        form.setError(name, { message: "form.validations.unSupportedFile" });
        setIsLoading(false);
      } else {
        values.push({
          [urlKey]: url,
          caption: "",
        });
        form.setValue(name, values, { shouldTouch: true, shouldDirty: true });
        form.clearErrors(name);
        setIsLoading(false);

        // We need to pass minCount to validate the field only after adding the required number of items
        if (minCount) {
          if (minCount <= values.length) {
            void form.trigger(name);
          }
        } else {
          void form.trigger(name);
        }
      }
    },
    onError: (error: Error) => {
      setIsLoading(false);
      console.error(error);
    },
  });

  const handleChange = useCallback(async (files: Array<File>): Promise<void> => {
    setIsLoading(true);
    await uploadFilesToGcp({ files });
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
    maxFiles: 10,
  });

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return source.data.instanceId === instanceId;
      },
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) {
          return;
        }
        const destinationSrc = destination.data.url;
        const startSrc = source.data.url;

        if (typeof destinationSrc !== "string") {
          return;
        }

        if (typeof startSrc !== "string") {
          return;
        }

        const updated = [...value];
        updated[value.findIndex(item => item[urlKey] === startSrc)] = value.find(
          item => item[urlKey] === destinationSrc,
        )!;
        updated[value.findIndex(item => item[urlKey] === destinationSrc)] = value.find(
          item => item[urlKey] === startSrc,
        )!;
        form.setValue(name, updated);
      },
    });
  }, [instanceId, value]);

  const icon: Record<ImageInputVariant, ReactNode> = {
    file: <UploadFileIcon isActive={isDragActive} />,
    image: <UploadImageIcon isActive={isDragActive} />,
    video: <UploadVideoIcon isActive={isDragActive} />,
  };

  return (
    <Grid
      {...getRootProps()}
      className="GalleryInput"
      container
      size={12}
      display="flex"
      alignItems="flex-start"
      flexDirection="column"
      flexWrap="wrap"
      mt={4}
    >
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

      <InstanceIdContext.Provider value={instanceId}>
        <Grid
          container
          size={12}
          display="flex"
          alignItems="flex-start"
          flexWrap="wrap"
          gap={4}
          onDragOver={e => e.stopPropagation()}
          onDrop={e => e.stopPropagation()}
        >
          {value.length < 10 && (
            <StyledFormControl required={required}>
              <FieldWrapper error={Boolean(error)} isLoading={isLoading} mode={"avatar"}>
                <Controller
                  name={name}
                  control={form.control}
                  render={({ field: { value: _value, ...field } }) => {
                    return <input {...field} {...getInputProps()} {...testIdProps} />;
                  }}
                />
                {icon[variant]}
                <ActionsBlock bucket={bucketUrl} open={open} mode="avatar" />
              </FieldWrapper>
            </StyledFormControl>
          )}
          {value.map((item, i) => (
            <GalleryItem
              caption={item.caption}
              hasCaption={hasCaption}
              required={required}
              className={className}
              bucketUrl={bucketUrl}
              url={item[urlKey]}
              name={name}
              key={i}
              index={i}
              urlKey={urlKey}
              onDelete={() => handleDeleteConfirm(i)}
              error={error}
            />
          ))}
        </Grid>
      </InstanceIdContext.Provider>
      {localizedHelperText && (
        <FormHelperText id={`${name}-helper-text`} error>
          {localizedHelperText}
        </FormHelperText>
      )}
    </Grid>
  );
};
