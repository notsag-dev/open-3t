module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'func-names': ['warn', 'as-needed'],
    'no-undef': 'off',
    'no-param-reassign': 'off'
  },
};
