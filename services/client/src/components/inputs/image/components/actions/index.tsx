import { forwardRef } from "react";
import { BoxProps, CircularProgress, IconButton, SxProps } from "@mui/material";

import { TrashIcon, UploadIcon } from "../../../../../shared";
import { StyledOptionsBlock } from "../../styled";
import { useDeleteUrl } from "../../use-delete-url";
import { ImageInputMode } from "../../types";

interface IActionsBlockProps extends BoxProps {
  bucket: string;
  required?: boolean;
  mode: ImageInputMode;
  onDeleteHandler?: () => void;
  value?: string;
  open?: () => void;
  withBucketDelete?: boolean;
}

export const ActionsBlock = forwardRef<HTMLDivElement, IActionsBlockProps>((props, ref) => {
  const { bucket, value, mode, withBucketDelete = true, onDeleteHandler, open, required, ...rest } = props;

  const { deleteUrl, isLoading } = useDeleteUrl(bucket);

  const onDelete = async () => {
    if (isLoading || !value) return;
    if (withBucketDelete) {
      await deleteUrl(value);
    }

    onDeleteHandler?.();
  };

  const actionsBlockSx: Record<ImageInputMode, SxProps> = {
    background: {
      bottom: 20,
      right: 18,
    },
    avatar: {
      bottom: 10,
      right: required ? 20 : 10,
    },
  };
  return (
    <StyledOptionsBlock {...rest} ref={ref} $mode={mode} sx={actionsBlockSx[mode]}>
      {!value && (
        <IconButton onClick={open}>
          <UploadIcon />
        </IconButton>
      )}
      {value && (
        <IconButton aria-label="delete" onClick={onDelete}>
          {!isLoading ? <TrashIcon /> : <CircularProgress size={23} />}
        </IconButton>
      )}
    </StyledOptionsBlock>
  );
});
