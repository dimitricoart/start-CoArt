import { useMutation } from "@tanstack/react-query";

import { useApi } from "@framework/mui-form";

import { IGcpResponse, IGcpSignDataRequest, IUseGcpUploaderProps, IUseGcpUploaderReturnProps } from "./interfaces";
import { getFileMimeType } from "./utils";

export const scrubFilename = (filename: string) => {
  return filename.replace(/[^\w_\-.]+/gi, "");
};

export const useGcpUploader = (props: IUseGcpUploaderProps) => {
  const {
    onError = () => {
      return;
    },
    onFinish = () => {
      return;
    },
    signingUrl = "/storage/put",
    bucket = process.env.GOOGLE_STORAGE_BUCKET_ARTWORKS,
  } = props;

  const api = useApi();
  const { mutateAsync: getSignResultApi } = useMutation({
    mutationFn: async (data: IGcpSignDataRequest) => {
      return (await api.fetchJson({
        method: "PUT",
        url: signingUrl,
        data,
      })) as IGcpResponse;
    },
    onError: error => {
      console.error("[sign error]", error);
      throw error;
    },
  });

  async function uploadFile(file: File, signedUrl: string): Promise<any> {
    return fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": getFileMimeType(file) },
      mode: "cors",
    });
  }

  return async (props: IUseGcpUploaderReturnProps) => {
    const { files = [] } = props;

    async function getSignResult(file: File): Promise<string> {
      const fileName = scrubFilename(file.name);
      const data: IGcpSignDataRequest = {
        objectName: fileName,
        contentType: getFileMimeType(file),
        bucket: bucket,
      };

      const headers = new Headers();
      headers.set("Content-Type", getFileMimeType(file));

      const { signedUrl } = await getSignResultApi(data);

      return signedUrl || "";
    }

    try {
      for (const file of files) {
        const signedUrl = await getSignResult(file);
        if (!signedUrl) {
          throw new Error("signedUrl is missing");
        }

        const response = await uploadFile(file, signedUrl);

        if (response.status !== 200) {
          throw new Error(response);
        }

        onFinish({ signedUrl }, file);
        console.info("[successfully uploaded]");
      }
    } catch (error: any) {
      console.error("[upload error]", error);
      onError(error);
    }
  };
};
