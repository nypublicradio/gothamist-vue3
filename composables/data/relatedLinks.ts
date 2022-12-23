export async function getRelatedLinks(article, limit = 3) {
    const relatedLinksArr = []
    const pushArticleDataToArray = async (item) => {
        // get article data by id
        const articleData = await useAviary(`pages/${item.value.page}`)
        return {
            id: item.id,
            type: item.type,
            article: articleData,
            titleOverride: item.value.titleOverride,
        }
        //console.log('relatedLinksArr = ', relatedLinksArr)
    }
    const pushLinkDataToArray = (item) => {
        return {
            id: item.id,
            type: item.type,
            image: item.value.thumbnail,
            titleOverride: item.value.title,
            url: item.value.url,
        }
        //console.log('relatedLinksArr = ', relatedLinksArr)
    }
    // loop through related articles & links and push to array
    let requests = Promise.resolve(article.relatedLinks.slice(0, limit).map(async (item, index) => {
        if (item.type === 'cms_page') {
            return await pushArticleDataToArray(item)
        } else if (item.type === 'external_link') {
            return await pushLinkDataToArray(item)
        }
    }))

    // console.log('requests = ', Promise.all([requests]).then((values) => {
    //     console.log("values = ", values);
    // }))
    return Promise.all([requests]).then((values) => {
        console.log("values = ", values);
        return values
    })
}