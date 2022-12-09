export default async function useLoadMoreArticles(options) {
    const newArticles =  await findArticlePages(options).then(({ data }) =>
        normalizeFindArticlePagesResponse(data)
    )
    useUpdateCommentCounts(newArticles)
    return newArticles
}