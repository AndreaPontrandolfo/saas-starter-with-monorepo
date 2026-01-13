import { defineConfig } from "eslint/config";
import { sheriff, type SheriffSettings } from "eslint-config-sheriff";

const sheriffOptions: SheriffSettings = {
  react: true,
  lodash: false,
  remeda: false,
  next: false,
  astro: false,
  playwright: false,
  storybook: true,
  jest: false,
  vitest: false,
  tsconfigRootDir: import.meta.dirname,
};

export default defineConfig(
  sheriff(sheriffOptions),
  {
    files: ["**/*.types.ts"],
    rules: {
      "no-restricted-syntax": [
        2,
        {
          selector: "VariableDeclaration",
          message: "Variable declarations are not allowed in types files.",
        },
        {
          selector: "FunctionDeclaration",
          message: "Function declarations are not allowed in types files.",
        },
        {
          selector: "ExpressionStatement",
          message: "Expression statements are not allowed in types files.",
        },
      ],
    },
  },
  { ignores: ["./src/routeTree.gen.ts"] },
);
