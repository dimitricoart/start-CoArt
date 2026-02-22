import { memo, useContext, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { FormHelperText, Grid } from "@mui/material";

import { openUrlOnClick } from "../../../../../libs/open-url-on-click";
import { TextInput } from "../../../core";

import { StyledFormControl, StyledGalleryItemRoot, StyledImage, StyledPlaceholder } from "../../styled";
import { ActionsBlock } from "../actions";
import { InstanceIdContext } from "../../context";
import { getFileType } from "../../utils";
import { UploadDocumentIcon, UploadFileIcon, UploadVideoIcon } from "../../../../../shared";

type GalleryItemError = Record<string | number, any> | Array<Record<string | number, any>>;

interface IGalleryItemProps {
  caption: string;
  url: string;
  name: string;
  index: number;
  urlKey: string;
  bucketUrl: string;
  onDelete: () => void;
  className?: string;
  required?: boolean;
  hasCaption?: boolean;
  error?: GalleryItemError;
}

const setItemError = (index: number, urlKey: string, error?: GalleryItemError) => {
  if (!error || !Array.isArray(error)) {
    return null;
  }
  const itemErrorData: Record<string, any> = error?.[index];

  if (!itemErrorData) {
    return null;
  }
  if (urlKey in itemErrorData) {
    return error[index][urlKey].message || null;
  }
  return null;
};

export const GalleryItem = memo(function GalleryItem(props: IGalleryItemProps) {
  const {
    url,
    urlKey,
    bucketUrl,
    className,
    required,
    name,
    hasCaption = false,
    index,
    caption,
    error,
    onDelete,
  } = props;
  const ref = useRef<HTMLImageElement | null>(null);

  const instanceId = useContext(InstanceIdContext);
  const { formatMessage } = useIntl();

  useEffect(() => {
    const el = ref.current!;

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ type: "grid-item", url, instanceId }),
      }),
      dropTargetForElements({
        element: el,
        getData: () => ({ url }),
        getIsSticky: () => true,
        canDrop: ({ source }) =>
          source.data.instanceId === instanceId && source.data.type === "grid-item" && source.data.url !== url,
      }),
    );
  }, [instanceId, url]);

  const fileType = getFileType(url);

  const renderDisplay = () => {
    if (!fileType) {
      return (
        <StyledPlaceholder $mode="avatar" className="MuiError">
          <UploadFileIcon fontSize={"large"} />
        </StyledPlaceholder>
      );
    }

    const content = {
      document: (
        <StyledPlaceholder $mode="avatar">
          <UploadDocumentIcon fontSize={"large"} />
        </StyledPlaceholder>
      ),
      image: (
        <StyledImage
          sx={{ cursor: "pointer", display: "block" }}
          $mode={"avatar"}
          component="img"
          src={url}
          alt={formatMessage({ id: `form.labels.${name}` })}
          onClick={openUrlOnClick(url)}
          draggable={false}
        />
      ),
      video: (
        <StyledPlaceholder $mode="avatar">
          <UploadVideoIcon fontSize={"large"} />
        </StyledPlaceholder>
      ),
    };

    return content[fileType];
  };

  const itemError = setItemError(index, urlKey, error);
  const localizedItemErrorHelperText = itemError
    ? formatMessage({ id: itemError }, { label: formatMessage({ id: `form.labels.${urlKey}` }) })
    : "";

  return (
    <StyledGalleryItemRoot ref={ref}>
      <StyledFormControl className={className} required={required}>
        {renderDisplay()}
        <ActionsBlock
          mode={"avatar"}
          bucket={bucketUrl}
          withBucketDelete={false}
          value={url}
          onDeleteHandler={onDelete}
        />
      </StyledFormControl>
      {hasCaption && (
        <Grid mt={1}>
          <TextInput showLabel={false} name={`${name}[${index}].caption`} value={caption} />
        </Grid>
      )}
      {itemError && (
        <FormHelperText id={`${urlKey}-${index}-helper-text`} error>
          {localizedItemErrorHelperText}
        </FormHelperText>
      )}
    </StyledGalleryItemRoot>
  );
});
