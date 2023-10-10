export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  useServerHead({
    link: [
      { rel: 'preconnect', href: 'https://www.googletagmanager.com', tagPriority: 'high' },
    ],
    noscript: [
      {
        children: `<iframe src=&quot;https://www.googletagmanager.com/ns.html?id=${config.public.GTM_ID}&quot;
        height=&quot;0&quot; width=&quot;0&quot; style=&quot;display:none;visibility:hidden&quot;></iframe>`,
      },
    ],
  })

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${config.public.GA_MEASUREMENT_ID}`,
        async: true,
      },
    ],
  })

  if (!process.server) {
    setTimeout(() => {
      (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({ 'gtm.start':
        new Date().getTime(), event: 'gtm.js' }); const f = d.getElementsByTagName(s)[0]
        const j = d.createElement(s); const dl = l != 'dataLayer' ? `&l=${l}` : ''; j.async = true; j.src
        = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`; f.parentNode.insertBefore(j, f)
      })(window, document, 'script', 'dataLayer', config.public.GTM_ID)
    })
  }
})
