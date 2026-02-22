import React, { SVGProps } from "react";

interface IUploadFileIconProps extends SVGProps<any> {
  isActive?: boolean;
}

export const UploadFileIcon = ({ width = 48, height = 48, isActive, ...rest }: IUploadFileIconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M32.8809 17.8008C40.0809 18.4208 43.0209 22.1208 43.0209 30.2208V30.4808C43.0209 39.4208 39.4409 43.0008 30.5009 43.0008H17.4809C8.54094 43.0008 4.96094 39.4208 4.96094 30.4808V30.2208C4.96094 22.1808 7.86094 18.4808 14.9409 17.8208"
        stroke={isActive ? "#B6B6B6" : "#E7E7E7"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 30.0022V7.24219"
        stroke={isActive ? "#B6B6B6" : "#E7E7E7"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.7008 11.7L24.0008 5L17.3008 11.7"
        stroke={isActive ? "#B6B6B6" : "#E7E7E7"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
