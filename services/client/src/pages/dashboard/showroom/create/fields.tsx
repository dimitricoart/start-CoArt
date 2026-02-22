import { FC, RefObject } from "react";
import { FormattedMessage } from "react-intl";

import { TextInput, LexicalTextEditor } from "../../../../components/inputs";
import { IShowroomCreateDto } from "@framework/types";
import { FormWrapper } from "@framework/mui-form";

import { validationSchema } from "./validation";
import { ImageInput } from "../../../../components/inputs";
import { InputBox } from "../../../../components/input-box";
import { Button } from "../../../../components/buttons";

export interface IShowroomCreateFormProps {
  initialValues: IShowroomCreateDto;
  innerRef?: RefObject<HTMLFormElement | null>;
  onSubmit: (values: IShowroomCreateDto) => Promise<void>;
  onSuccess?: () => void;
}

export const ShowroomFields: FC<IShowroomCreateFormProps> = props => {
  return (
    <FormWrapper
      showButtons={false}
      validationSchema={validationSchema}
      name="showroom"
      renderButtons={props => (
        <Button
          className="ShowroomUpdate-SubmitButton"
          isLoading={props.isLoading}
          variant="contained"
          type="submit"
          color="primary"
          data-testid="ShowroomCreateSubmitButton"
        >
          <FormattedMessage id="form.buttons.submit" />
        </Button>
      )}
      onSuccess={props.onSuccess}
      {...props}
    >
      <ImageInput
        required
        name="imageUrl"
        variant="image"
        label={<FormattedMessage id="form.labels.coverImageUrl" />}
        bucket={process.env.GOOGLE_STORAGE_BUCKET_SHOWROOMS}
        mode="avatar"
        showLabel={true}
        className="ShowroomForm-ImageInput"
      />
      <InputBox required labelId={"title"}>
        <TextInput showLabel={false} name="title" variant="outlined" />
      </InputBox>
      <LexicalTextEditor
        required
        name="description"
        controls={{
          history: ["undo", "redo"],
          blockFormat: ["paragraph", "h1", "h2", "h3", "h4", "h5", "h6", "bullet", "number", "quote"],
          textFormat: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "link",
            "leftAlign",
            "centerAlign",
            "rightAlign",
          ],
          viewFormat: ["horizontal", "image", "video", "table"],
          clear: ["editor"],
        }}
      />
    </FormWrapper>
  );
};
