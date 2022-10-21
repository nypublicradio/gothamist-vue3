import { useMembershipStatus } from "~~/composables/states"

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const membershipStatus = useMembershipStatus()

  window.dataLayer = window.dataLayer || []
  // init gtag function
  function gtag() { dataLayer.push(arguments) }
  gtag('js', new Date())
  gtag('set', 'send_page_view', false)
  gtag('config', config.GA_MEASUREMENT_ID)
  gtag('config', config.NPR_GA_MEASUREMENT_ID)

  // event to use when sending gtag events
  const sendEvent = (name: string, params: Record<string, string>) => {
    gtag('event', name, {
      send_to:  config.GA_MEASUREMENT_ID,
      ...params
    })
  }
  // gtag even for reporting on page views
  const sendPageView = (params: Record<string, string>) => {
    sendEvent('page_view', {
      send_to:  config.GA_MEASUREMENT_ID,
      page_location: document.location.href,
      page_title: document.title,
      NYPRMember: membershipStatus.value,
      ...params
    })
    if (config.NPR_GA_MEASUREMENT_ID) {
      sendEvent('page_view', {
        send_to:  config.NPR_GA_MEASUREMENT_ID,
        page_location: document.location.href,
        page_title: document.title,
      })
    }
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