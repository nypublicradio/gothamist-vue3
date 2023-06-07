import { ArticlePage } from "./types/Page";
import { compareAsc, subMonths } from 'date-fns';
export default function useWalledState(article:ArticlePage) {

  // is the article's updatedDate later than the threshold date?
  const wallThreshold = subMonths(new Date(), 6) // 6 months ago
  if (compareAsc(article.updatedDate || article.publicationDate, wallThreshold) > 0) {
    return false
  }

  // does the user have a newsletter member cookie?
  const cookie = useCookie('__gothamistNewsletterMember', { path: '/' })
  if (typeof cookie.value !== 'undefined') {
    return false
  }

  return true
}