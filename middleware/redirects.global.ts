import { redirects } from '~/utils/redirects'

export default defineNuxtRouteMiddleware((to) => {
  const redirect = redirects.find(r => r.from === to.path)
  return redirect
    ? navigateTo(
      to.query && Object.keys(to.query).length
        ? `${redirect.to}?${new URLSearchParams(to.query as Record<string, string>).toString()}`
        : redirect.to,
      { redirectCode: 301 },
    )
    : undefined
})
