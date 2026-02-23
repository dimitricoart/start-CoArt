export default typeof globalThis !== "undefined"
  ? globalThis
  : typeof window !== "undefined"
    ? window
    : (typeof self !== "undefined" ? self : ({} as typeof globalThis));
