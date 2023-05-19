import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';

export default defineNuxtPlugin((nuxtApp) => {
    const { vueApp } = nuxtApp;

    const config = useRuntimeConfig();

    Sentry.init({
        app: [vueApp],
        dsn: config.public.SENTRY_DSN,
        integrations: [
            new Integrations.BrowserTracing({
                routingInstrumentation: Sentry.vueRouterInstrumentation(nuxtApp.$router),
                tracePropagationTargets: ['cms.demo.nypr.digital', 'api.demo.nypr.digital', 'cms.prod.nypr.digital', 'api.prod.nypr.digital']
            })
        ],
        logErrors: true,
        debug: false,
        sampleRate: 1,
        tracesSampleRate: 1,
        environment: config.public.SENTRY_ENV,
        beforeSend(event) {
            return event;
        }
    });

    const defaults = {
        timeout: 2000,
        hooks: ['activate', 'mount', 'update']
    }
    vueApp.mixin(Sentry.createTracingMixins({
        ...defaults,
        trackComponents: true
    }));

    Sentry.attachErrorHandler(vueApp, {
        ...defaults,
        logErrors: false,
        attachProps: true,
        trackComponents: true,
    });

    return {
        provide: {
            sentry: {
                setContext: (n, context) => Sentry.setContext(n, context),
                setUser: (user) => Sentry.setUser(user),
                setTag: (tagName, value) => Sentry.setTag(tagName, value),
                addBreadcrumb: (breadcrumb) => Sentry.addBreadcrumb(breadcrumb),
                captureException: (exception) => Sentry.captureException(exception)
            }
        }
    }
});
