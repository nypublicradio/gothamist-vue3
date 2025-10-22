interface htlbidType {
  cmd: (() => void)[]
  layout: (type: string) => void
  setTargeting: (keys: string, targetingParams: string[]) => void
  clearTargeting: (key: string) => void
  forceRefresh: () => void
}

interface tudeType {
  cmd: (() => void)[]
}

type WindowWithHtlbid = Window & {
  htlbid: htlbidType
  tude: tudeType
}

declare const window: WindowWithHtlbid
declare const htlbid: htlbidType

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  useHead({
    link: [{
      rel: 'stylesheet',
      href: config.public.HTL_CSS,
      type: 'text/css',
    }],
    script: [{
      src: config.public.HTL_JS,
      async: true,
      key: 'htlbid-script',
    }],
  })

  function queueCommand(command: () => void) {
    window.tude = window.tude || {}
    window.tude.cmd = window.tude.cmd || []
    window.tude.cmd.push(() => {
      window.htlbid = window.htlbid || {}
      window.htlbid.cmd = window.htlbid.cmd || []
      window.htlbid.cmd.push(command)
    })
  }

  if (!process.server) {
    const init = () => {
      queueCommand(() => {
        htlbid.layout('universal')
      })
    }
    const setTargeting = (targetingParams) => {
      queueCommand(() => {
        for (const key in targetingParams)
          htlbid.setTargeting(key, targetingParams[key])
      })
    }
    const clearTargeting = (targetingParams) => {
      const targetingKeys = Object.keys(targetingParams)
      queueCommand(() => {
        targetingKeys.forEach((key) => {
          htlbid.clearTargeting(key)
        })
      })
    }
    const setTargetingForRoute = (route) => {
      setTargeting({
        is_home: route.name === 'index' ? 'yes' : 'no',
        host: location.host,
        url: route.path,
        urlSegments: route.path
          .split('/')
          .filter(segment => segment.length > 0),
      })
    }
    const clearAds = () => {
      queueCommand(() => {
        htlbid.forceRefresh()
      })
    }
    return {
      provide: {
        htlbid: {
          init,
          setTargeting,
          clearTargeting,
          setTargetingForRoute,
          clearAds,
        },
      },
    }
  }
  return null
})
