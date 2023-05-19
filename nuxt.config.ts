export default defineNuxtConfig({
  app: {
    head: {
      meta: [
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
          crossorigin: ''
        },
        {
          rel: 'preconnect',
          href: 'https://www.googletagmanager.com',
          crossorigin: ''
        },
        {
          rel: 'preconnect',
          href: 'https://www.google-analytics.com',
          crossorigin: ''
        }
      ],
    }
  },
  css: [
    '@nypublicradio/nypr-design-system-vue3/src/assets/themes/gothamist/fonts/fonts.css',
    '@nypublicradio/nypr-design-system-vue3/src/assets/themes/gothamist/gothamist.min.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // besure to mirror theses imports in the vitest.config.ts
          additionalData: '@import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/gothamist/breakpoints.scss"; @import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/gothamist/_mixins.scss"; @import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/gothamist/typography.scss"; @import "~/assets/scss/global.scss";',
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
  imports: {
    dirs: [
      'composables', // top-level modules
      'composables/*/index.{ts,js,mjs,mts}' // one level directories's index.js
    ]
  },
  components: [
    {
      path: '~/components',
    },
    {
      path: '~/components/marketing-banners',
      pathPrefix: false,
    },
  ],
  build: {
    transpile: [
      'primevue',
      'gsap'
    ]
  },
  modules: ['@nuxtjs/partytown'],
  runtimeConfig: {
    public: {
      SENTRY_DSN: process.env['SENTRY_DSN'] || 'https://531d9ce2b7a14759a35f95f3dd1ee743@o557978.ingest.sentry.io/6537168',
      SENTRY_ENV: process.env['SENTRY_ENV'] || 'development',
      HTL_CSS: process.env['HTL_CSS'] || 'https://htlbid.com/stage/v3/gothamistv3.com/htlbid.css',
      HTL_JS: process.env['HTL_JS'] || 'https://htlbid.com/stage/v3/gothamistv3.com/htlbid.js',
      HTL_IS_TESTING: process.env['HTL_IS_TESTING'] || 'yes',
      API_URL: process.env['API_URL'] || 'https://cms.demo.nypr.digital/api/v2',
      IMAGE_BASE_URL: process.env['IMAGE_BASE_URL'] || 'https://cms.demo.nypr.digital/images/',
      IMAGE_CDN_URL: process.env['IMAGE_CDN_URL'] || 'https://cdn.cms.demo.nypr.digital',
      GA_MEASUREMENT_ID: process.env['GA_MEASUREMENT_ID'] || 'G-3Y8891NN3P',
      GTM_ID: process.env['GTM_ID'] || 'GTM-W6RXBNS',
      NEWSLETTER_API: process.env['NEWSLETTER_API'] || 'https://api.demo.nypr.digital/email-proxy/subscribe',
      NEWSLETTER_MAIN_LIST_ID: '65dbec786b',
      NEWSLETTER_MULTI_LIST_IDS: process.env['NEWSLETTER_MULTI_LIST_IDS'] || 'Gothamist++Gothamist Membership++Gothamist - Early Addition',
      DEBUG: process.env['DEBUG'] || 'false',
      donateUrlBase: 'https://pledge.wnyc.org/support/gothamist/?utm_medium=partnersite&utm_source=gothamist',
      OPENWEB_SPOT_ID: process.env['OPENWEB_SPOT_ID'] || 'sp_6X1qAIKA',
      OG_IMAGE: process.env['OG_IMAGE'] || 'https://gothamist-vue3demo.gothamist.com/gothamist_og.png',
      navigationId: 1,
      systemMessagesId: 2,
      sitewideComponentsId: 2,
      betaUrl: '//beta.gothamist.com',
      LIVESTREAM_URL: process.env['LIVESTREAM_URL'] || 'https://api.demo.nypr.digital/api/v4/whats_on/',
      NEWRELIC_AGENT: process.env['NEWRELIC_AGENT'] || 'newrelic-dev.js',
      OPTIN_MONSTER_ACCOUNT_ID: process.env['OPTIN_MONSTER_ACCOUNT_ID'] || '267513',
      OPTIN_MONSTER_USER_ID: process.env['OPTIN_MONSTER_USER_ID'] || '250465',
    }
  },
  ssr: Boolean(process.env['NUXT_SSR'] !== 'false'),
  typescript: {
    strict: true
  }
})