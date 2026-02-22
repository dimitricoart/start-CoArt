import React, { SVGProps } from "react";

export const ButtonArrowIcon = ({ width = 19, height = 19, ...rest }: SVGProps<any>) => {
  return (
    <svg width={width} height={height} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g clipPath="url(#clip0_1_725)">
        <path
          d="M13.3884 4.18862L7.12398 4.01486C6.78232 4.0208 6.3567 4.32613 6.35075 4.71672C6.33886 5.10004 6.69838 5.45956 7.0883 5.45426L11.6801 5.5732L4.06091 13.1924C3.77937 13.474 3.77938 13.93 4.06091 14.2115C4.34243 14.493 4.79845 14.493 5.07997 14.2115L12.6992 6.59227L12.8195 11.1841C12.8076 11.5674 13.1737 11.9573 13.557 11.9216C13.9166 11.886 14.2827 11.5317 14.2529 11.1425L14.0844 4.88467C14.0844 4.62032 13.8386 4.18281 13.3892 4.18942L13.3884 4.18862Z"
          fill="#0072FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_725">
          <rect width="14.3558" height="11.7239" fill="white" transform="translate(0 10.1511) rotate(-45)" />
        </clipPath>
      </defs>
    </svg>
  );
};
