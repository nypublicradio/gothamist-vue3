const redirects =
  [
    { from: '/tags/wethecommuters', to: '/tags/we-the-commuters' },
    { from: '/tags/agata%26valentia', to: '/tags/agata-valentia' },
    { from: '/tags/agata&valentia', to: '/tags/agata-valentia' },
    { from: '/tags/Sets%20&%20the%20City%20profile', to: '/tags/sets-and-the-city-profile' }
  ]

export default fromNodeMiddleware((req, res, next) => {
  // const host = req.headers.host
  // const fullUrl = req.url
  const url = req.url.split('?')[0]
  let urlParams = null
  if (req.url.includes('?')) {
    urlParams = `?${req.url.split('?')[1]}`
  }

  const redirect = redirects.find(r => r.from === url)
  if (redirect) {
    let newLocation
    if (urlParams) {
      newLocation = redirect.to + urlParams
    } else {
      newLocation = redirect.to
    }
    res.writeHead(301, {
      Location: newLocation
    })
    res.end()
  } else {
    next()
  }
})
