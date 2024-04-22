import { useMembershipStatus } from '~~/composables/states'

type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[]
}

declare const window: WindowWithDataLayer
declare const dataLayer: Record<string, any>[]

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const membershipStatus = useMembershipStatus()
  window.dataLayer = window.dataLayer || []

  // init gtag function
  function gtag() {
    dataLayer.push(arguments) // eslint-disable-line prefer-rest-params
  }
  gtag('js', new Date())
  gtag('set', 'send_page_view', false)
  gtag('config', config.public.GA_MEASUREMENT_ID)

  // event to use when sending gtag events
  const sendEvent = (name: string, params: Record<string, string>) => {
    gtag('event', name, params)
  }
  // gtag even for reporting on page views
  const sendPageView = (params: Record<string, string>) => {
    sendEvent('page_view', {
      page_location: document.location.href,
      page_title: document.title,
      NYPRMember: membershipStatus.value,
      ...params,
    })
  }
  const scheduleEvent = (name: string, params: Record<string, string>) => {
    requestIdleCallback(() => {
      sendEvent(name, params)
    }, { timeout: 3000 })
  }
  const schedulePageView = (params: Record<string, string>) => {
    requestIdleCallback(() => {
      sendPageView(params)
    }, { timeout: 3000 })
  }

  return {
    provide: {
      analytics: {
        sendEvent,
        sendPageView,
        scheduleEvent,
        schedulePageView,
      },
    },
  }
})
