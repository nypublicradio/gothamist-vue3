import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  const config = useRuntimeConfig()

  Sentry.init({
    app: [vueApp],
    dsn: config.public.SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(nuxtApp.$router),
      }),
      new HttpClient(),
      new Sentry.Replay(),
    ],
    tracesSampleRate: 0.5,
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 0.05,
    tracePropagationTargets: ['cms.demo.nypr.digital', 'api.demo.nypr.digital', 'cms.prod.nypr.digital', 'api.prod.nypr.digital'],
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
