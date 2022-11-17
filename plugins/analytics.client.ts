import { useMembershipStatus } from "~~/composables/states"

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const membershipStatus = useMembershipStatus()

  window.dataLayer = window.dataLayer || []
  // init gtag function
  function gtag() { dataLayer.push(arguments) }
  gtag('js', new Date())
  gtag('set', 'send_page_view', false)

  // Add multiple measurement IDs so we can route events
  // to them using named groups and the 'send_to' parameter
  // https://developers.google.com/tag-platform/gtagjs/routing
  gtag('config', config.GA_MEASUREMENT_ID, { 'groups': 'NYPR' })
  gtag('config', config.NPR_GA_MEASUREMENT_ID, { 'groups': 'NPR' })

  // send a custom named gtag events
  const sendEvent = (name: string, params: Record<string, string>) => {
    gtag('event', name, {
      send_to:  'NYPR',
      ...params
    })
  }

  // send a page view event
  const sendPageView = (params: Record<string, string>) => {
    // send a page view event to our main GA property
    sendEvent('page_view', {
      send_to:  'NYPR',
      page_location: document.location.href,
      page_title: document.title,
      NYPRMember: membershipStatus.value,
      ...params
    })
    // also send a page view to NPR (we dont need our member status flag here or extra params here)
    if (config.NPR_GA_MEASUREMENT_ID) {
      sendEvent('page_view', {
        send_to: 'NPR',
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