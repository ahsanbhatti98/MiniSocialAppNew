module.exports = {
  root: true,
  extends: ['@react-native'],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error', // Keep errors for unused vars
    'react-native/no-inline-styles': 'off', // Disable inline style warnings
    'react/react-in-jsx-scope': 'off', //  Disable eact' must be in scope warnings
    'react-hooks/exhaustive-deps': 'off', // Disable exhaustive deps warnings
  },
};
