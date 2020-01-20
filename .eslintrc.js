module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    "plugin:import/recommended",
    "airbnb",
    "airbnb/hooks"

  ],
  "settings": {
    "import/resolver": {
      "node": {
        "paths": [
          "src"
        ]
      },
    }
  },
  rules: {
    "import/namespace": ["error", { "allowComputed": true }],
    "object-curly-newline": "off",
    'quotes': ["error", "single", { "allowTemplateLiterals": true }],
    'react/forbid-prop-types': 'off',
    'react/jsx-handler-names': ['error', {
      eventHandlerPrefix: 'handle',
      eventHandlerPropPrefix: 'on',
    }],
    'react/jsx-props-no-spreading': 'off',
    'react/sort-prop-types': 'error',
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".md"] }],
  },
};
