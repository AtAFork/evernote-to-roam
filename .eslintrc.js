  module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
      '@typescript-eslint',
      'react'
      
  ],
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  extends: [
    'airbnb',
    'eslint:all',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // "plugin:import/errors",
    // "plugin:import/warnings",
    // "plugin:import/typescript",
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  rules: {
    "import/extensions": "off",
    "sort-keys": "off",
    "no-console": "off",
    // for purposes of typescript so i can return undefined instead of void, b/c void is sketchy and also shouldn't be tested for truthiness according to ts
    "no-undefined": "off",
    "init-declarations": "off",
    "max-len": "off",
    "max-lines": "off",
    "no-magic-numbers": "off",
    "camelcase": "off",
    "id-length": "off",
    "no-process-env": "off",
    "max-statements": "off",
    "max-lines-per-function": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-invalid-this": "off",
    "lines-around-comment": "off",
    "sort-imports": "off",
    // "react/forbid-prop-types": "off",

  },
};


// module.exports = {
//   env: {
//     browser: true,
//     es6: true,
//     node: true,
//   },

//   extends: [
//     'airbnb',
//     'eslint:all',
//     'plugin:react/recommended',
//   ],
//   globals: {
//     Atomics: 'readonly',
//     SharedArrayBuffer: 'readonly',
//   },
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     ecmaVersion: 2018,
//     sourceType: 'module',
//   },
//   plugins: [
//     'react',
//   ],
//   parser: 'babel-eslint',
//   rules: {
//     "sort-keys": "off",
//     "no-console": "off",
//     "max-len": "off",
//     "max-lines": "off",
//     "no-magic-numbers": "off",
//     "camelcase": "off",
//     "id-length": "off",
//     "no-process-env": "off",
//     "max-statements": "off",
//     "max-lines-per-function": "off",
//     "jsx-a11y/anchor-is-valid": "off",
//     "no-invalid-this": "off",
//     "lines-around-comment": "off",
//     "sort-imports": "off",
//     "react/forbid-prop-types": "off",

//   },
// };


