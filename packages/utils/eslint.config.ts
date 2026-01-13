import { sheriff, tseslint } from 'eslint-config-sheriff'

const sheriffOptions = {
  react: false,
  lodash: false,
  remeda: true,
  next: false,
  playwright: false,
  jest: false,
  vitest: true,
}

export default tseslint.config([
  ...sheriff(sheriffOptions),
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: './tsconfig.json',
      },
    },
  },
  {
    rules: {
      'no-implicit-coercion': [2, { boolean: false }],
      'fsecond/prefer-destructured-optionals': 0,
      'remeda/prefer-remeda-typecheck': 0,
      'remeda/collection-method-value': 0,
      'remeda/collection-return': 0,
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      'unicorn/no-useless-undefined': 0,
      '@typescript-eslint/naming-convention': 0,
      'vitest/max-nested-describe': [
        2,
        {
          max: 1,
        },
      ],
    },
  },
  { ignores: ['**/vitest-output/**/*', '**/vite.config.ts.timestamp*'] },
])
