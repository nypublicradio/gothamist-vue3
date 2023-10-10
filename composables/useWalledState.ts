import { compareAsc, subMonths } from 'date-fns'
import type { ArticlePage } from './types/Page'

export default function useWalledState(article: ArticlePage) {
  const config = useRuntimeConfig()
  const route = useRoute()
  if (!process.server) {
    // drafts shouldn't be walled
    if (!article.updatedDate && !article.publicationDate)
      return false

    if (route.query.preview)
      return false

    // articles newer than the threshold date shouldn't be walled
    const wallThreshold = subMonths(new Date(), 6) // 6 months ago
    if (compareAsc(article.updatedDate || article.publicationDate, wallThreshold) > 0)
      return false

    // sponsored content shouldn't be walled
    if (article.sponsoredContent)
      return false

    // content shouldn't be walled if it's has a tag on the allow list
    const ignoredTags = config.public.WALL_ALLOW_LIST?.split(',') || []
    if (article.tags.some(tag => ignoredTags.includes(tag.slug)))
      return false

    // content shouldn't be walled when the user has a newsletter member cookie
    const cookie = useCookie('__gothamistNewsletterMember', { path: '/' })
    return typeof cookie.value === 'undefined'
  }
  // content not hidden on server side rendering
  return false
}
