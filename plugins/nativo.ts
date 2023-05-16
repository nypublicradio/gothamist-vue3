
export default defineNuxtPlugin(() => {
  useServerHead({
    link: [
      { rel: 'preconnect', href: 'https://s.ntv.io/', tagPriority: 'high'}
    ],
  })
  useHead({
    script: [
      {
        src: 'https://s.ntv.io/serve/load.js',
        async: true,
        'data-ntv-set-no-auto-start': ''
      }
    ]
  })
  return {
    provide: {
      nativo: {
        refresh: () => {
          if (typeof PostRelease !== 'undefined') {
            PostRelease.Start()
            console.log('activating NATIVO')
          }
        }
      }
    }
  }
})