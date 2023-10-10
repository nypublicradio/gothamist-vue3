// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'api.json',
    'assets/gsap/**',
    'cf_functions/**',
    'cypress/fixtures/**',
  ],
})
