import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  meta: {
    meta: [
      { name: 'charset', content: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#f4f2f0' },
      { name: 'theme-color', content: '#f4f2f0' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: "180x180", href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ff3904' },
      {
        rel: 'preconnect',
        href: process.env.API_URL,
        crossorigin: true
      },
      {
        rel: 'preconnect',
        href: 'https://www.googletagmanager.com',
        crossorigin: true
      },
      {
        rel: 'preconnect',
        href: 'https://www.google-analytics.com',
        crossorigin: true
      }
    ],
  },
  //buildModules: [],
  css: [
    '@nypublicradio/nypr-design-system-vue3/src/assets/themes/gothamist/gothamist.min.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    'mosha-vue-toastify/dist/style.css',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // besure to mirror theses imports in the vitest.config.ts
          additionalData: `@import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/gothamist/variables.scss"; @import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/gothamist/_mixins.scss"; @import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/gothamist/typography.scss"; @import "~/assets/scss/global.scss";`,
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
  },
  components: true,
  build: {
    transpile: [
      'primevue',
      'mosha-vue-toastify',
      'gsap'
    ]
  },
  publicRuntimeConfig: {
    SENTRY_DSN: process.env['SENTRY_DSN'] || 'https://531d9ce2b7a14759a35f95f3dd1ee743@o557978.ingest.sentry.io/6537168',
    SENTRY_ENV: process.env['SENTRY_ENV'] || 'development',
    HTL_CSS: process.env['HTL_CSS'] || 'https://htlbid.com/stage/v3/gothamist.com/htlbid.css',
    HTL_JS: process.env['HTL_JS'] || 'https://htlbid.com/stage/v3/gothamist.com/htlbid.js',
    HTL_IS_TESTING: process.env['HTL_IS_TESTING'] || 'yes',
    API_URL: process.env['API_URL'] || 'https://cms.demo.nypr.digital/api/v2',
    IMAGE_BASE_URL: process.env['IMAGE_BASE_URL'] || 'https://cms.demo.nypr.digital/images/',
    GA_MEASUREMENT_ID: process.env['GA_MEASUREMENT_ID'],
    NEWSLETTER_API: process.env['NEWSLETTER_API'] || 'https://api.demo.nypr.digital/email-proxy/subscribe',
    NEWSLETTER_LIST_ID: '65dbec786b',
    DEBUG: process.env['DEBUG'] || 'false',
    donateUrlBase: 'https://pledge.wnyc.org/support/gothamist/?utm_medium=partnersite&utm_source=gothamist',
    OPENWEB_SPOT_ID: process.env['OPENWEB_SPOT_ID'] || 'sp_vQiXnkhf',
    navigationId: 1,
    systemMessagesId: 2,
    sitewideComponentsId: 2,
  },
  typescript: {
    strict: true
  }
})