import { CacheControlAgeTime } from '~/composables/types/CacheControlAgeTime'

export default fromNodeMiddleware((req, res, next) => {
  const url = decodeURI(req.url)
  const regex = /[\p{Script=Han}\p{Script=Hangul}\p{Script=Thai}]/gu
  const found = [...url.matchAll(regex)]

  if (found.length >= 5) {
    res.writeHead(301, {
      'Location': '/',
      'cache-control': `public, max-age=${CacheControlAgeTime.MONTH}`,
    })
    res.end()
  }
  else {
    next()
  }
})
