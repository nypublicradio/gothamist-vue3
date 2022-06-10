import { onMounted } from 'vue'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    window.dataLayer = window.dataLayer || []
    function gtag() {dataLayer.push(arguments)}
    gtag('js', new Date())
    gtag('set', 'send_page_view', false)
    gtag('config', config.GA_MEASUREMENT_ID)

    const sendEvent = (name: string, params: Record<string, any>) => {
      gtag('event', name, params)
    }
    const sendPageView = (params: Record<string, any>) => {
      sendEvent('page_view', {
        page_location: document.location.href,
        page_title: document.title,
        ...params
      })
    }
    return {
    provide: {
      analytics: {
        sendEvent,
        sendPageView
      }
    }
  }
})