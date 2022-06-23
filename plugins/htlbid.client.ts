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
            console.log('SET TARGETING', key, targetingParams[key])
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
      document.querySelectorAll('.htl-ad').forEach(function (el) {
        el.remove()
      })
      document.querySelectorAll('.htl-ad-gpt').forEach(function (el) {
        el.remove()
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