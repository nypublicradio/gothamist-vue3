import { defineConfig } from 'cypress'
import cypressSplit from 'cypress-split'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      cypressSplit(on, config)
      return config
    },
  },
})
