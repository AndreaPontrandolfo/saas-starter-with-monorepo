import { defineConfig } from "vitest/config";

export default defineConfig(() => {
  return {
    cacheDir: "./node_modules/.cache/vite",
    test: {
      coverage: {
        reporter: ["text", "json", "html"],
        reportsDirectory: "./vitest-output/coverage",
        thresholds: {
          lines: 90,
          statements: 90,
          functions: 100,
          branches: 90,
        },
        exclude: [
          "coverage/**",
          "dist/**",
          ".turbo/**",
          "vitest-output/**",
          "packages/*/test?(s)/**",
          "**/*.d.ts",
          "**/virtual:*",
          "**/__x00__*",
          "**/\x00*",
          "cypress/**",
          "test?(s)/**",
          "test?(-*).?(c|m)[jt]s?(x)",
          "**/*{.,-}{test,spec}.?(c|m)[jt]s?(x)",
          "**/__tests__/**",
          "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
          "**/vitest.{workspace,projects}.[jt]s?(on)",
          "**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}",
          "eslint.config.ts",
        ],
      },
    },
  };
});
