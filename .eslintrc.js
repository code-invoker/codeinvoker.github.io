module.exports = {
  extends: [ 'eslint:recommended', 'immortal' ],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  rules: {
    'prefer-template': 'off'
  }
};
