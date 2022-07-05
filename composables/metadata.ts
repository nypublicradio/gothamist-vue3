import { ArticlePage } from './types/Page'

  // Get tracking values for GA for an article
  function useArticlePageTrackingData(article: ArticlePage): Record<string, any> {
    return {
      page_type: 'article',
      article_authors: article.authors.map(author => author.name).join(','),
      article_publish_date: article.publicationDate,
      article_updated_date: article.updatedDate,
      article_tags: article.tags.map(tag => tag.slug).join(','),
      article_title: article.title,
      article_primary_tag: article.tags[0]?.slug
    }
  }

  // Get ad targeting values for HTL for an article
  function useArticlePageAdTargetingData(article: ArticlePage):Record<string, any> {
    return {
      Template: 'Article',
      tags: article?.tags?.map(tag => tag.name),
      racy: article?.provocativeContent ? 'true' : '',
      Sponsor: article?.sponsors?.map(tag => tag.name),
      Category: article?.section.name
    }
  }

  // Get <head> metadata values (for use with useHead) for an article
  function useArticlePageHeadMetadata(article: ArticlePage):Record<string, any> {
    const metadata = {
      meta: [
        { name: 'og:title', content: article.socialTitle },
        { name: 'og:description', content: article.socialDescription },
        { name: 'og:url', content: article.url },
        { name: 'og:image', content: useImageUrl(article.socialImage, {width: 1200, height: 650, quality: 85}) },
        { name: 'og:image:width', content: '1200' },
        { name: 'og:image:height', content: '650' },
        { name: 'og:image:alt', content: article.socialImage.alt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'article:published_time', content: article.publicationDate?.toISOString() },
        { name: 'article:modified_time', content: article.updatedDate?.toISOString() || ''},
        { name: 'article:section', content: article.section.name },
        { name: 'article:tag', content: article.tags.map(tag => tag.slug).join(',') },
      ],
      script: [
        {
            type: 'application/ld-json',
            children: JSON.stringify(useArticlePageStructuredData(article)),
        },
      ]
    }
    for (const author of article.authors) {
      metadata.meta.push( { name: 'article:author', content: `https://gothamist.com${author.url}` })
    }
    return metadata
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
  function useBreadcrumbList(breadcrumb:{name: string, url:string}):Record<string, any> {
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
  function useArticlePageStructuredData(article: ArticlePage):Record<string, any> {
      const publisher = {
      '@type': 'NewsMediaOrganization',
      name: 'Gothamist',
      logo: {
        '@type': 'ImageObject',
        url: 'http://gothamist.com/static-images/home_og_1200x600.png',
        width: '1200',
        height: '600'
      },
      sameAs: 'https://www.facebook.com/gothamist,https://twitter.com/gothamist,https://www.instagram.com/gothamist,https://www.youtube.com/channel/UCY_2VeS5Q9_sMZRhtvF0c5Q,https://en.wikipedia.org/wiki/Gothamist',
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
          alternativeHeadline: article.seoTitle,
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

  export {
    useArticlePageTrackingData,
    useArticlePageAdTargetingData,
    useArticlePageHeadMetadata,
  }