import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { includeIgnoreFile } from "@eslint/compat";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));

const eslintConfig = [
  includeIgnoreFile(join(__dirname, ".gitignore")),
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default eslintConfig;
