import { lookup } from "mime-types";

import { DOCUMENT_EXTENSIONS, IMAGE_EXTENSIONS, VIDEO_EXTENSIONS } from "./constants";
import { FileType } from "./types";

export function humanFileSize(size: number): string {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) + " " + ["B", "KB", "MB", "GB", "TB"][i];
}

export const getFileMimeType = (file: File): string => {
  return file.type || (lookup(file.name) as string);
};

export function getFileType(url?: string): FileType | null {
  if (!url) return null;

  const pathname = new URL(url).pathname;
  const filename = pathname.split("/").pop();

  if (!filename) return null;

  const ext = filename.split(".").pop();

  if (!ext) return null;

  if (VIDEO_EXTENSIONS.includes(ext)) {
    return "video";
  }

  if (IMAGE_EXTENSIONS.includes(ext)) {
    return "image";
  }

  if (DOCUMENT_EXTENSIONS.includes(ext)) {
    return "document";
  }

  return null;
}
