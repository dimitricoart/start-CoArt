import { FC } from "react";

import { GalleryInput } from "../../components/inputs";
import { useApi } from "@framework/mui-form";
import { FormWrapper } from "@framework/mui-form";

import { validationSchema } from "./validation";

export const Test: FC = () => {
  const api = useApi();

  const handleSubmit = async (values: any): Promise<any> => {
    return api.fetchJson({
      url: "/test",
      data: values,
    });
  };

  return (
    <FormWrapper
      initialValues={{
        photos: [],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      name="test"
    >
      <GalleryInput name="photos" bucket={""} />
    </FormWrapper>
  );
};
