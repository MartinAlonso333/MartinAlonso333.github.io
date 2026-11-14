import next from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";

const config = [
  {
    ignores: [".next/**", "out/**", "node_modules/**"],
  },
  ...next,
  prettier,
];

export default config;
