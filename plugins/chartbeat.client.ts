import { nextTick } from 'vue';

export default defineNuxtPlugin(() => {
  /* eslint-disable */
  (function() {
    /** CONFIGURATION START **/
    const _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
    _sf_async_config.uid = 16246; //CHANGE THIS TO YOUR ACCOUNT ID
    _sf_async_config.domain = 'gothamist.com'; //CHANGE THIS TO YOUR SITE ID
    _sf_async_config.useCanonical = true;
    _sf_async_config.useCanonicalDomain = true;
    _sf_async_config.section = ''; //SET PAGE SECTION(S)
    _sf_async_config.authors = ''; //SET PAGE AUTHOR(S)
    _sf_async_config.title = document.title; //SET PAGE TITLE
    /** CONFIGURATION END **/
    function loadChartbeat() {
      const e = document.createElement('script');
      const n = document.getElementsByTagName('script')[0];
      e.type = 'text/javascript';
      e.async = true;
      e.src = '//static.chartbeat.com/js/chartbeat.js';
      n.parentNode.insertBefore(e, n);
    }
    loadChartbeat();
  })();
  const updatePage = (pageInfo) => {
    if (!process.server && typeof window.pSUPERFLY !== 'undefined') {
        window.pSUPERFLY.virtualPage(pageInfo)
    }
  }
  return {
    provide: {
      chartbeat: {
        updatePage
      }
    }
  }
})