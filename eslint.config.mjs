import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["**/dist", "**/static", "contracts", "eslint.config.mjs", "**/*.d.ts"],
  },
  {
    languageOptions: {
      parserOptions: {
        project: [
          "./tsconfig.eslint.json",
          "./packages/*/tsconfig.eslint.json",
          "./services/*/tsconfig.eslint.json",
        ],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node, ...globals.browser },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
);
