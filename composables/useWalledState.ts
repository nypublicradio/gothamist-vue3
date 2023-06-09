import { ArticlePage } from "./types/Page";
import { compareAsc, subMonths } from 'date-fns';
export default function useWalledState(article:ArticlePage) {

  // articles newer than the threshold date shouldn't be walled
  const wallThreshold = subMonths(new Date(), 6) // 6 months ago
  if (compareAsc(article.updatedDate || article.publicationDate, wallThreshold) > 0) {
    return false
  }

  // sponsored content shouldn't be walled
  if (article.sponsoredContent === true) {
    return false
  }

  // content shouldn't be walled when the user has a newsletter member cookie
  const cookie = useCookie('__gothamistNewsletterMember', { path: '/' })
  if (typeof cookie.value !== 'undefined') {
    return false
  }

  return true
}