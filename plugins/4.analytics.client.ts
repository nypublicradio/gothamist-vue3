import { useMembershipStatus } from '~~/composables/states'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const membershipStatus = useMembershipStatus()
  const { $experiments } = useNuxtApp()

  window.dataLayer = window.dataLayer || []
  // init gtag function
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('set', 'send_page_view', false)
  gtag('config', config.public.GA_MEASUREMENT_ID)

  // event to use when sending gtag events
  const sendEvent = (name: string, params: Record<string, string>) => {
    if ($experiments.current) {
      gtag('event', name, {
        experimentName: $experiments.current.name,
        experimentVariant: $experiments.activeVariant,
        ...params,
      })
    }
    else {
      gtag('event', name, params)
    }
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
  return {
    provide: {
      analytics: {
        sendEvent,
        sendPageView,
      },
    },
  }
})
