/* global htlbid */
export default defineNuxtPlugin(() => {

  useHead({
    style: [{
      children: '@media screen and (min-width:0px) and (min-height:0px){.htlad-gothamist_index_leaderboard_1{min-height:50px}.htlad-gothamist_index_leaderboard_2{min-height:50px}.htlad-gothamist_index_midpage_1{min-height:250px}.htlad-gothamist_index_midpage_2{min-height:250px}.htlad-gothamist_index_midpage_3{min-height:250px}.htlad-gothamist_index_midpage_4{min-height:250px}.htlad-gothamist_interior_leaderboard_1{min-height:50px}.htlad-gothamist_interior_leaderboard_2{min-height:50px}.htlad-gothamist_interior_midpage_1{min-height:250px}.htlad-gothamist_interior_midpage_2{min-height:250px}.htlad-gothamist_interior_midpage_3{min-height:250px}.htlad-gothamist_interior_midpage_4{min-height:250px}.htlad-gothamist_interior_midpage_5{min-height:250px}.htlad-gothamist_interior_midpage_repeating{min-height:250px}.htlad-gothamist_index_leaderboard_1{display:flex;justify-content:center;align-items:flex-start}.htlad-gothamist_index_leaderboard_2,.htlad-gothamist_index_midpage_1,.htlad-gothamist_index_midpage_2,.htlad-gothamist_index_midpage_3,.htlad-gothamist_index_midpage_4,.htlad-gothamist_interior_leaderboard_1,.htlad-gothamist_interior_leaderboard_2,.htlad-gothamist_interior_midpage_1,.htlad-gothamist_interior_midpage_2,.htlad-gothamist_interior_midpage_3,.htlad-gothamist_interior_midpage_4,.htlad-gothamist_interior_midpage_5,.htlad-gothamist_interior_midpage_repeating{display:flex;justify-content:center;align-items:center}}@media screen and (min-width:768px) and (min-height:0px){.htlad-gothamist_index_leaderboard_1{min-height:90px}.htlad-gothamist_index_leaderboard_2{min-height:90px}.htlad-gothamist_index_midpage_1{min-height:250px}.htlad-gothamist_index_midpage_2{min-height:250px}.htlad-gothamist_index_midpage_3{min-height:250px}.htlad-gothamist_index_midpage_4{min-height:250px}.htlad-gothamist_interior_leaderboard_1{min-height:90px}.htlad-gothamist_interior_leaderboard_2{min-height:90px}.htlad-gothamist_interior_midpage_1{min-height:250px}.htlad-gothamist_interior_midpage_2{min-height:250px}.htlad-gothamist_interior_midpage_3{min-height:250px}.htlad-gothamist_interior_midpage_4{min-height:90px}.htlad-gothamist_interior_midpage_5{min-height:250px}.htlad-gothamist_interior_midpage_repeating{min-height:250px}.htlad-gothamist_index_leaderboard_1{display:flex;justify-content:center;align-items:flex-start}.htlad-gothamist_index_leaderboard_2,.htlad-gothamist_index_midpage_1,.htlad-gothamist_index_midpage_2,.htlad-gothamist_index_midpage_3,.htlad-gothamist_index_midpage_4,.htlad-gothamist_interior_leaderboard_1,.htlad-gothamist_interior_leaderboard_2,.htlad-gothamist_interior_midpage_1,.htlad-gothamist_interior_midpage_2,.htlad-gothamist_interior_midpage_3,.htlad-gothamist_interior_midpage_4,.htlad-gothamist_interior_midpage_5,.htlad-gothamist_interior_midpage_repeating{display:flex;justify-content:center;align-items:center}}@media screen and (min-width:1024px) and (min-height:0px){.htlad-gothamist_index_leaderboard_1{min-height:90px}.htlad-gothamist_index_leaderboard_2{min-height:250px}.htlad-gothamist_index_midpage_1{min-height:250px}.htlad-gothamist_index_midpage_2{min-height:250px}.htlad-gothamist_index_midpage_3{min-height:250px}.htlad-gothamist_index_midpage_4{min-height:250px}.htlad-gothamist_interior_leaderboard_1{min-height:90px}.htlad-gothamist_interior_leaderboard_2{min-height:250px}.htlad-gothamist_interior_midpage_1{min-height:250px}.htlad-gothamist_interior_midpage_2{min-height:250px}.htlad-gothamist_interior_midpage_3{min-height:250px}.htlad-gothamist_interior_midpage_4{min-height:250px}.htlad-gothamist_interior_midpage_5{min-height:250px}.htlad-gothamist_interior_midpage_repeating{min-height:250px}.htlad-gothamist_index_leaderboard_1{display:flex;justify-content:center;align-items:flex-start}.htlad-gothamist_index_leaderboard_2,.htlad-gothamist_index_midpage_1,.htlad-gothamist_index_midpage_2,.htlad-gothamist_index_midpage_3,.htlad-gothamist_index_midpage_4,.htlad-gothamist_interior_leaderboard_1,.htlad-gothamist_interior_leaderboard_2,.htlad-gothamist_interior_midpage_1,.htlad-gothamist_interior_midpage_2,.htlad-gothamist_interior_midpage_3,.htlad-gothamist_interior_midpage_4,.htlad-gothamist_interior_midpage_5,.htlad-gothamist_interior_midpage_repeating{display:flex;justify-content:center;align-items:center}}.index section .ad-wrapper-outer{position:relative;z-index:1}.vox-concert-ad{width:100%!important;position:relative!important}img[src*="//ams-pageview-public.s3.amazonaws.com/1x1-pixel.png?id=1134d752a69a"]{display:none}'
    }]
  })
  if (!process.server) {
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
  }
})