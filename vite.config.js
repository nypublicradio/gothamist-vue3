import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sentryVitePlugin } from '@sentry/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [vue(), sentryVitePlugin({
    org: 'nypublicradio',
    project: 'gothamist-vue-3',
    authToken: process.env.SENTRY_AUTH_TOKEN,
  })],
})
