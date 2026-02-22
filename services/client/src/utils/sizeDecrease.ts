export const sizeDecreaseCalc = (maxSize: number, minSize: number, unit?: "px" | "%" | "deg") => {
  return `calc(${minSize}${unit || "px"} + (${maxSize} - ${minSize}) * ((100vw - 320px) / (1920 - 320)))`;
};
