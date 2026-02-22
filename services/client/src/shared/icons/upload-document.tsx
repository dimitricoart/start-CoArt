import React, { SVGProps } from "react";

interface IUploadDocumentIconProps extends SVGProps<any> {
  isActive?: boolean;
}

export const UploadDocumentIcon = ({ width = 48, height = 48, isActive, ...rest }: IUploadDocumentIconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M44 20V30C44 40 40 44 30 44H18C8 44 4 40 4 30V18C4 8 8 4 18 4H28"
        stroke={isActive ? "#B6B6B6" : "#E7E7E7"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M44 20H36C30 20 28 18 28 12V4L44 20Z"
        stroke={isActive ? "#B6B6B6" : "#E7E7E7"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 26H26"
        stroke={isActive ? "#B6B6B6" : "#E7E7E7"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 34H22"
        stroke={isActive ? "#B6B6B6" : "#E7E7E7"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
