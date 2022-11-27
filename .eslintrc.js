module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'airbnb-base', 'prettier'],
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'max-len': 'warn',
    'no-console': 'off',
    'vue/order-in-components': 'off',
    'vue/no-v-for-template-key': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-shadow': 'off',
    'vue/valid-v-slot': 'off',
    'vue/no-v-html': 'off',
    'no-param-reassign': ['error', { props: false }],
    'linebreak-style': 'off',
  },
};
