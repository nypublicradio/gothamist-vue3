import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on) {
      on('task', {
        log(message) {
          // eslint-disable-next-line no-console
          console.log(message)
          return null
        },
        table(message) {
          // eslint-disable-next-line no-console
          console.table(message)
          return null
        },
      })
    },
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
})
