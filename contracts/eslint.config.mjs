import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["**/dist", "**/artifacts", "**/cache", "**/coverage", "**/typechain-types", "eslint.config.mjs"],
  },
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.eslint.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.node,
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
);
