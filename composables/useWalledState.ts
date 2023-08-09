import { ArticlePage } from "./types/Page";
import { compareAsc, subMonths } from 'date-fns';
export default function useWalledState(article:ArticlePage) {
  let config = useRuntimeConfig()
  if (!process.server) {
    // articles newer than the threshold date shouldn't be walled
    const wallThreshold = subMonths(new Date(), 6) // 6 months ago
    if (compareAsc(article.updatedDate || article.publicationDate, wallThreshold) > 0) {
      return false
    }

    // sponsored content shouldn't be walled
    if (article.sponsoredContent) {
      return false
    }

    // content shouldn't be walled if it's has a tag on the allow list
    const ignoredTags = config.public['WALL_ALLOW_LIST']?.split(',') || []
    console.log('tags | ', article.tags, ' | ignore | ', ignoredTags)
    if (article.tags.some(tag => ignoredTags.includes(tag.slug))) {
      return false
    }

    // content shouldn't be walled when the user has a newsletter member cookie
    const cookie = useCookie('__gothamistNewsletterMember', { path: '/' })
    return typeof cookie.value === 'undefined'
  }
}