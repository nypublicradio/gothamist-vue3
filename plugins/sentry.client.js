import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  const config = useRuntimeConfig()

  Sentry.init({
    app: [vueApp],
    dsn: config.public.SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration({
        router: nuxtApp.$router,
        enableInp: true,
        interactionsSampleRate: 0.5,
      }),
    ],
    tracesSampleRate: config.public.SENTRY_ENV.toUpperCase() === 'PROD' ? 0.1 : 1.0,
    allowUrls: [
      'https://gothamist.com',
      'https://gothamist-vue3.demo.nypr.digital',
      'https://gothamist-vue3demo.gothamist.com',
    ],
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Failed to fetch',
      'NetworkError when attempting to fetch resource.',
      'Load failed',
    ],
    maxValueLength: 1000,
    tracePropagationTargets: ['cms.demo.nypr.digital', 'cms.prod.nypr.digital'],
    trackComponents: true,
    timeout: 2000,
    hooks: ['activate', 'mount', 'update'],
    logErrors: true,
    debug: false,
    environment: config.public.SENTRY_ENV,
  })

  return {
    provide: {
      sentry: {
        setContext: (n, context) => Sentry.setContext(n, context),
        setUser: user => Sentry.setUser(user),
        setTag: (tagName, value) => Sentry.setTag(tagName, value),
        addBreadcrumb: breadcrumb => Sentry.addBreadcrumb(breadcrumb),
        captureException: exception => Sentry.captureException(exception),
      },
    },
  }
})
