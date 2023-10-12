// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: true,
  ignores: [
    'api.json',
    'assets/gsap/**',
    'cf_functions/**',
    'cypress/fixtures/**',
    'node_modules/**',
  ],
}, {
  rules: {
    'style/quotes': ['error', 'single', { allowTemplateLiterals: false, avoidEscape: false }],
  },
}, {
  files: ['**/*.js', '**/*.ts', '**/*.vue'],
  rules: {
    'consistent-return': 'error',
    'no-implicit-coercion': 'error',
    'node/prefer-global/process': ['error', 'always'],
    'require-await': 'error',
    'ts/prefer-function-type': 'error',
    'ts/unified-signatures': 'error',

    // it would be nice to turn these on one day but one step at a time
    'ts/no-floating-promises': 'off',
    'ts/no-unnecessary-type-assertion': 'off',
    'ts/no-unsafe-argument': 'off',
    'ts/no-unsafe-assignment': 'off',
    'ts/no-unsafe-call': 'off',
    'ts/no-unsafe-member-access': 'off',
    'ts/no-unsafe-return': 'off',
    'ts/restrict-template-expressions': 'off',
  },
}, {
  files: ['**/*.vue'],
  rules: {
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/no-empty-component-block': 'error',
    'vue/no-unused-properties': 'error',
  },
})
