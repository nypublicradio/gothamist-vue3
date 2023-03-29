import { ArticlePage, GalleryPage } from './types/Page'
  // Get tracking values for GA for an article
  function useArticlePageTrackingData(article: ArticlePage): Record<string, string> {
    return {
      page_type: 'article',
      content_group: article.sponsoredContent ? 'sponsored-content' : `${article.section.slug}-article`,
      article_authors: article.authors.map(author => author.name).join(','),
      article_publish_date: article.publicationDate?.toISOString(),
      article_updated_date: article.updatedDate?.toISOString(),
      article_tags: article.tags.map(tag => tag.slug).join(','),
      article_title: article.title,
      article_primary_tag: article.tags[0]?.slug
    }
  }

  // Get ad targeting values for HTL for an article
  function useArticlePageAdTargetingData(article: ArticlePage):Record<string, string | string[]> {
    return {
      Template: 'Article',
      tags: article?.tags?.map(tag => tag.name),
      racy: article?.provocativeContent ? 'true' : '',
      Sponsor: article?.sponsors?.map(tag => tag.name),
      Category: article?.section.name
    }
  }

  // Get the list of breadcrumbs, different paths to the
  // article via sections and tags
  function useBreadcrumbs (article: ArticlePage):{name: string, url: string}[] {
    const breadcrumbs = [
        {
          name: article.section.name,
          url: `/${article.section.slug}`
        }
      ]
      if (
        article.tags?.find(
          tag => tag.name === 'opinion' || tag.name === '@opinion'
        )
      ) {
        breadcrumbs.push({
          name: 'Opinion',
          url: '/tags/opinion'
        })
      }
      if (
        article.tags?.find(
          tag => tag.name === 'analysis' || tag.name === '@analysis'
        )
      ) {
        breadcrumbs.push({
          name: 'Analysis',
          url: '/tags/analysis'
        })
      }
      if (article.tags?.find(tag => tag.name === 'we the commuters')) {
        breadcrumbs.push({
          name: 'We The Commuters',
          url: '/tags/we-the-commuters'
        })
      }
      return breadcrumbs
  }

  // turn a breadcrumb into a JSON-LD breadcrumbList
  function useBreadcrumbList(breadcrumb:{name: string, url:string}):Record<string, unknown> {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: [{
        "@type": "ListItem",
        "position": 1,
        "name": breadcrumb.name,
        "item": `https://gothamist.com${breadcrumb.url}`
      }]
    }
  }

  // Get JSON-LD metadata for an article
  function useArticlePageStructuredData(article: ArticlePage):Record<string, unknown> {
      const publisher = {
      '@type': 'NewsMediaOrganization',
      name: 'Gothamist',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gothamist.com/static-images/home_og_1200x600.png',
        width: '1200',
        height: '600'
      },
      sameAs: 'https://en.wikipedia.org/wiki/Gothamist',
      url: 'https://gothamist.com',
      diversityPolicy: 'https://www.nypublicradio.org/diversity-dei-overview/'
    }

    const author = article.authors?.map((author) => {
      return {
        '@type': 'Person',
        name: author.name,
        email: author.email,
        jobTitle: author.jobTitle,
        image: author.photoID && {
          '@type': 'ImageObject',
          url: useImageUrl({ id: author.photoID }, { width:600, height:600, quality: 85 }),
          height: 600,
          width: 600,
          caption: author.name
        },
        url: `https://gothamist.com${author.url}`,
        sameAs: ''
      }
    })

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'NewsArticle',
          mainEntityOfPage: article.url,
          image: article.socialImage && {
            '@type': 'ImageObject',
            url: useImageUrl(article.socialImage, { width:1200, height:800, quality: 85 }),
            width: 1200,
            height: 800,
            caption: article.socialImage?.caption
          },
          headline: article.seoTitle,
          alternativeHeadline: [article.title, article.socialTitle, article.listingTitle],
          description: article.searchDescription,
          datePublished: article.publicationDate,
          dateModified: article.updatedDate,
          author,
          publisher,
          isAccessibleForFree: true
        },
        ...useBreadcrumbs(article).map(useBreadcrumbList)
      ]
    }
  }

  // Get <head> metadata values (for use with useHead) for an article
  function useArticlePageHeadMetadata(article: ArticlePage)
    :{ title: string, meta: ({name: string, content: string} | {property: string, content: string})[] }
  {   
    const config = useRuntimeConfig()
    const metadata = {
      title: `${article.seoTitle} - Gothamist`,
      link: [
        {rel: 'canonical', href: article?.url}
      ],
      meta: [
        { property: 'og:title', content: article.socialTitle },
        { property: 'og:description', content: article.socialDescription },
        { property: 'og:url', content: article.url },
        { property: 'og:image', content: useImageUrl(article.socialImage, {width: 1200, height: 650, quality: 85}) || config.public.OG_IMAGE },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '650' },
        { property: 'og:image:alt', content: article.socialImage?.alt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'article:published_time', content: article.publicationDate?.toISOString() },
        { name: 'article:modified_time', content: article.updatedDate?.toISOString() || ''},
        { name: 'article:section', content: article.section.name },
        { name: 'article:tag', content: article.tags.map(tag => tag.slug).join(',') },
      ],
      script: [{
        type: 'application/ld+json',
        children: JSON.stringify(useArticlePageStructuredData(article))
      }]
    }
    for (const author of article.authors) {
      metadata.meta.push( { name: 'article:author', content: `https://gothamist.com${author.url}` })
    }
    if (article.sponsoredContent) {
      metadata.meta.push({
        name: 'robots', content: 'noindex,nofollow'
      })
    }
    return metadata
  }

  // Get <head> metadata values (for use with useHead) for a gallery
  function useGalleryPageHeadMetadata(gallery: GalleryPage)
    :{ meta: ({name: string, content: string} | {property: string, content: string})[] } 
    {
    const config = useRuntimeConfig()
    const metadata = {
      meta: [
        { property: 'og:title', content: `${gallery.socialTitle} - Photo Gallery - Gothamist` },
        { property: 'og:description', content: gallery.socialDescription },
        { property: 'og:url', content: gallery.url },
        { property: 'og:image', content: useImageUrl(gallery.socialImage, {width: 1200, height: 650, quality: 85}) || config.public.OG_IMAGE },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '650' },
        { property: 'og:image:alt', content: gallery.socialImage?.alt },
        { name: 'twitter:card', content: 'summary_large_image' },
      ]}
    return metadata
  }

  export {
    useArticlePageTrackingData,
    useArticlePageAdTargetingData,
    useArticlePageHeadMetadata,
    useArticlePageStructuredData,
    useGalleryPageHeadMetadata
  }
