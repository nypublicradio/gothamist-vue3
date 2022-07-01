import { ArticlePage } from './types/Page'

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

  function useArticlePageAdTargetingData(article: ArticlePage):Record<string, any> {
    return {
      Template: 'Article',
      tags: article?.tags?.map(tag => tag.name),
      racy: article?.provocativeContent ? 'true' : '',
      Sponsor: article?.sponsors?.map(tag => tag.name),
      Category: article?.section.name
    }
  }

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
    for (let author of article.authors) {
      metadata.meta.push( { name: 'article:author', content: `https://gothamist.com${author.url}` })
    }
    return metadata
  }

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
        {
          '@type': 'BreadcrumbList',
          itemListElement: useBreadcrumbs(article).map((crumb, index) => {
            return {
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@id': `https://gothamist.com${crumb.slug}`,
                name: crumb.name
              }
            }
          })
        }
      ]
    }
  }

  function useBreadcrumbs (article: ArticlePage):Record<string, any> {
    const breadcrumbs = [
        {
          name: article.section.name,
          slug: `/${article.section.slug}`
        }
      ]
      if (article.sponsoredContent) {
        breadcrumbs.push({ name: 'Sponsored', slug: '' })
      }
      if (
        article.tags?.find(
          tag => tag.name === 'opinion' || tag.name === '@opinion'
        )
      ) {
        breadcrumbs.push({
          name: 'Opinion',
          slug: '/tags/opinion'
        })
      }
      if (
        article.tags?.find(
          tag => tag.name === 'analysis' || tag.name === '@analysis'
        )
      ) {
        breadcrumbs.push({
          name: 'Analysis',
          slug: '/tags/analysis'
        })
      }
      if (article.tags?.find(tag => tag.name === 'we the commuters')) {
        breadcrumbs.push({
          name: 'We The Commuters',
          slug: '/tags/we-the-commuters'
        })
      }
      return breadcrumbs
  }

  export {
    useArticlePageTrackingData,
    useArticlePageAdTargetingData,
    useArticlePageHeadMetadata,
  }