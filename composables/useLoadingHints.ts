export default async function useResourceHints() {
  // Resource loading hints to optimize page performance
  const config = useRuntimeConfig()
  useServerHead({
    link: [
      { rel: 'preconnect', href: config.public.API_URL, crossorigin: '', tagPriority: 'high'},
      { rel: 'preconnect', href: config.public.IMAGE_CDN_URL, tagPriority: 'high'},
      { rel: 'preconnect', href: 'https://www.googletagmanager.com', tagPriority: 'high'},
      { rel: 'preconnect', href: 'https://s.ntv.io/', tagPriority: 'high'},
    ]
  })
}