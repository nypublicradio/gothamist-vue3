export default defineNuxtPlugin({
  name: 'cache-control',
  hooks: {
    'app:rendered': function () {
      const event = useRequestEvent()
      const cacheControlMaxAge = useCacheControlMaxAge()

      if (cacheControlMaxAge.value > 0 && process.env.NODE_ENV !== 'development')
        event.res.setHeader('Cache-Control', `public, max-age=${cacheControlMaxAge.value}`)
    },
  },
})
