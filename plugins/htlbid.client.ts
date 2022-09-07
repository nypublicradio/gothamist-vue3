/* global htlbid */
export default defineNuxtPlugin(() => {
    window.htlbid = window.htlbid || {}
    htlbid.cmd = htlbid.cmd || []

    const init = () => {
        htlbid.cmd.push(function () {
            htlbid.layout('universal') 
        })
    }   
    const setTargeting = (targetingParams) => {
        htlbid.cmd.push(() => {
          for (const key in targetingParams) {
            htlbid.setTargeting(key, targetingParams[key])
          }
        })
    }
    const clearTargeting = (targetingParams) => {
        const targetingKeys = Object.keys(targetingParams)
        htlbid.cmd.push(() => {
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
                .filter(segment => segment.length > 0)
        })
    }
    const clearAds = () => {
        htlbid.cmd.push(() => {
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
            clearAds
          }
        }
      }
})