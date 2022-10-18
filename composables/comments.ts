import { hash } from 'ohash'
import { ArticlePage } from './types/Page'

// State to track the map of article ids to comment counts
export const useCommentCounts = () => useState<Record<string,number>>('commentCounts', () => ({}))

// Gets comment counts for a list of comment ids
export const useFetchCommentCounts = async function(commentIds:string[]) {
    const config = useRuntimeConfig()
    const baseURL = 'https://open-api.spot.im'
    const path = '/v1/messages-count'
    const counts = {}
    let ids = commentIds.slice(0)
    // OpenWeb API  comment count api limits requests to 30 counts at a time
    while (ids.length) {
        const idList = ids.splice(0, 30).join(',')
        const options = {
            params: {
                "spot_id": config.OPENWEB_SPOT_ID,
                "posts_ids": idList            
            }
        }
        const key = hash(['comments', path, options, Number(new Date())])
        const { data } = await useFetch(path, {baseURL, key, ...options})
        Object.entries(data.value["messages_count"]).forEach(([key, value]) => {
            counts[key] = value
        })
    }
    return counts
}

// get comment counts for a list of articles and update the state
export const useUpdateCommentCounts = async function(articles:ArticlePage[]) {
    const commentCounts = useCommentCounts()
    const commentIds = articles.map(article => String(article.legacyId || article.uuid))
    const commentCountData = await useFetchCommentCounts(commentIds)
    Object.entries(commentCountData).forEach(([key, value]) => {
        commentCounts.value[key] =  value
    })
}