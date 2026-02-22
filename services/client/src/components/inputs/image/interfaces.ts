export interface IUseGcpUploaderProps {
  baseUrl?: string;
  signingUrl?: string;
  bucket?: string;
  onError?: (error: Error) => void;
  onFinish?: (result: IGcpResponse, file: File) => void;
}

export interface IUseGcpUploaderReturnProps {
  files: File[];
}

export interface IGcpResponse {
  signedUrl: string;
}

export interface IGcpSignDataRequest {
  objectName: string;
  contentType: string;
  bucket: string;
}
