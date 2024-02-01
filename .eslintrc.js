module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 10,
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  extends: [
    "next/core-web-vitals",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint/eslint-plugin"],
  rules: {
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "react/display-name": "off",
    "@next/next/no-img-element": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
  overrides: [
    {
      files: ["src/**/*.ts", "src/**/*.tsx"],
      parserOptions: {
        project: ["tsconfig.json"],
        tsconfigRootDir: "./",
      },
    },
  ],
};
