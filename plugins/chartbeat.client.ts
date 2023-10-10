export default defineNuxtPlugin(() => {
  const firstPageLoaded = useChartbeatFirstPageLoaded()

  const initializeChartbeat = (pageInfo) => {
    const _sf_async_config = window._sf_async_config = (window._sf_async_config || {})
    _sf_async_config.uid = 16246
    _sf_async_config.domain = 'gothamist.com'
    _sf_async_config.useCanonical = true
    _sf_async_config.useCanonicalDomain = true
    _sf_async_config.sections = pageInfo.sections || ''
    _sf_async_config.authors = pageInfo.authors || ''
    _sf_async_config.title = document.title

    const e = document.createElement('script')
    const n = document.getElementsByTagName('script')[0]
    e.type = 'text/javascript'
    e.async = true
    e.src = '//static.chartbeat.com/js/chartbeat.js'
    n.parentNode.insertBefore(e, n)
  }

  const updateChartbeat = (pageInfo) => {
    if (typeof window.pSUPERFLY !== 'undefined')
      window.pSUPERFLY.virtualPage(pageInfo)
  }

  const updatePage = (pageInfo) => {
    if (!process.server) {
      if (firstPageLoaded.value === false) {
        firstPageLoaded.value = true
        initializeChartbeat(pageInfo)
      }
      else {
        updateChartbeat(pageInfo)
      }
    }
  }

  return {
    provide: {
      chartbeat: {
        updatePage,
      },
    },
  }
})
