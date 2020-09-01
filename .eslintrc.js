module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    '@goproperly/eslint-config-properly-base',
    'plugin:@typescript-eslint/recommended',
  ],
};
