import React, { SVGProps } from "react";

interface IUploadVideoIconProps extends SVGProps<any> {
  isActive?: boolean;
}

export const UploadVideoIcon = ({ width = 48, height = 48, isActive, ...rest }: IUploadVideoIconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M44 30V18C44 8 40 4 30 4H18C8 4 4 8 4 18V30C4 40 8 44 18 44H30C40 44 44 40 44 30Z"
        stroke={isActive ? "#B6B6B6" : "#E7E7E7"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.03906 14.2197H42.9591"
        stroke={isActive ? "#B6B6B6" : "#E7E7E7"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0391 4.21973V13.9397"
        stroke={isActive ? "#B6B6B6" : "#E7E7E7"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.9609 4.21973V13.0397"
        stroke={isActive ? "#B6B6B6" : "#E7E7E7"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 28.9002V26.5002C19.5 23.4202 21.68 22.1602 24.34 23.7002L26.42 24.9002L28.5 26.1002C31.16 27.6402 31.16 30.1602 28.5 31.7002L26.42 32.9002L24.34 34.1002C21.68 35.6402 19.5 34.3802 19.5 31.3002V28.9002V28.9002Z"
        stroke={isActive ? "#B6B6B6" : "#E7E7E7"}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
