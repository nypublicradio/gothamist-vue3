describe('An article page', () => {
  beforeEach(() => {
    cy.loadGlobalFixtures()
    cy.intercept({
      pathname: '/api/v2/pages/find',
      query: {
        html_path: 'news/extra-extra-meet-connecticuts-answer-to-pizza-rat',
      },
    }, { fixture: 'aviary/article.json' }).as('article')
    cy.intercept({
      pathname: '/api/v2/pages/find',
      query: {
        html_path: 'news',
      },
    }, { fixture: 'aviary/news-page.json' }).as('newsPage')
    cy.intercept({
      pathname: '/api/v2/pages',
      query: {
        type: 'news.ArticlePage',
        fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
        order: '-publication_date',
        show_on_index_listing: 'true',
        sponsored_content: 'false',
        descendant_of: '4',
        limit: '6',
      },
    }, { fixture: 'aviary/more-news.json' }).as('moreNews')
    cy.setCookie('__gothamistNewsletterMember', 'true', { path: '/' })
  })
  it('successfully loads', () => {
    cy.visit('/news/extra-extra-meet-connecticuts-answer-to-pizza-rat')
    cy.wait('@article')

    cy.get('h1').should('exist')
    cy.get('.byline').should('exist')
    cy.get('.article-body').should('exist')
    cy.get('.tags').should('exist')
    cy.get('.author-profile').should('exist')
    cy.get('.recirculation').should('exist')
    cy.get('.recirculation .gothamist-card:not(.hidden)').should('have.length', 5)
    cy.get('.recirculation .gothamist-card:not(.hidden)').should('have.length', 5)
    cy.get('.recirculation .gothamist-card:not(.hidden)').eq(1).should('have.attr', 'id', 'ntv-article-1')
  })
  it('shows preview for draft articles', () => {
    cy.clearCookie('__gothamistNewsletterMember')

    cy.intercept(
      '/api/v2/page_preview/*',
      { fixture: 'aviary/preview-article-draft.json' },
    ).as('draftArticlePreview')

    cy.visit('/preview?identifier=abc&token=123')
    cy.wait('@draftArticlePreview').then(() => {
      cy.wait(500)
      cy.get('h1').should('exist')
      cy.get('.byline').should('exist')
      cy.get('.article-body').should('exist')
      cy.get('.author-profile').should('exist')
      cy.get('.recirculation').should('exist')
      cy.get('.recirculation .gothamist-card:not(.hidden)').should('have.length', 5)
      cy.get('.recirculation .gothamist-card:not(.hidden)').eq(1).should('have.attr', 'id', 'ntv-article-1')
      cy.get('h2.regwall-header').should('not.exist')
    })
  })
  it('shows articles without lead images', () => {
    cy.intercept({
      pathname: '/api/v2/pages/find',
      query: {
        html_path: 'news/worst-of-the-worst-graffiti-tagger-map-caught',
      },
    }, { fixture: 'aviary/article-no-image.json' }).as('articleNoImage')

    cy.visit('/news/worst-of-the-worst-graffiti-tagger-map-caught')
    cy.wait('@articleNoImage')

    cy.get('h1').should('exist')
    cy.get('.byline').should('exist')
    cy.get('.article-body').should('exist')
    cy.get('.author-profile').should('exist')
    cy.get('.recirculation').should('exist')
    cy.get('.recirculation .gothamist-card:not(.hidden)').should('have.length', 5)
  })
  it('shows the content wall on old articles', () => {
    cy.clearCookie('__gothamistNewsletterMember')

    cy.fixture('aviary/article.json').then((article) => {
      article.publication_date = new Date('1990-01-01').toISOString()
      article.meta.first_published_at = new Date('1990-01-01').toISOString()
      cy.intercept({
        pathname: '/api/v2/pages/find',
        query: {
          html_path: 'news/extra-extra-meet-connecticuts-answer-to-pizza-rat',
        },
      }, { body: article }).as('oldArticle')

      cy.visit('/news/extra-extra-meet-connecticuts-answer-to-pizza-rat')
      cy.wait('@oldArticle').then(() => {
        cy.get('h2.regwall-header').should('contain', 'Read this story completely free')
      })
    })
  })
  it('clears the content wall on signup', () => {
    cy.clearCookie('__gothamistNewsletterMember')
    const emailAddress = 'test@example.com'

    cy.fixture('aviary/article.json').then((article) => {
      article.publication_date = new Date('1990-01-01').toISOString()
      article.meta.first_published_at = new Date('1990-01-01').toISOString()
      cy.intercept({
        pathname: '/api/v2/pages/find',
        query: {
          html_path: 'news/extra-extra-meet-connecticuts-answer-to-pizza-rat',
        },
      }, { body: article }).as('oldArticle')
      cy.intercept(
        'email-proxy/subscribe',
        (req) => {
          expect(req.body.email).to.eq(emailAddress)
          expect(req.body.list).to.eq('Gothamist Membership++Gothamist - Early Addition')
          expect(req.body.source).to.eq('gothamist_archive_regWall')
          req.reply({
            statusCode: 200,
          })
        },
      ).as('emailProxy')

      cy.visit('/news/extra-extra-meet-connecticuts-answer-to-pizza-rat')
      cy.wait('@oldArticle').then(() => {
        cy.get('h2.regwall-header').should('contain', 'Read this story completely free')
        cy.get('.regwall-form-wrapper input[type=email]').type(emailAddress)
        cy.contains('Sign Up').click()
        cy.wait('@emailProxy')
        cy.get('h2.regwall-header').should('contain', 'Thanks for subscribing!')
      })
    })
  })
  it('does not show the content wall on old articles when you have a cookie', () => {
    cy.setCookie('__gothamistNewsletterMember', 'true', { path: '/' })

    cy.fixture('aviary/article.json').then((article) => {
      article.publication_date = new Date('1990-01-01').toISOString()
      article.meta.first_published_at = new Date('1990-01-01').toISOString()
      cy.intercept({
        pathname: '/api/v2/pages/find',
        query: {
          html_path: 'news/extra-extra-meet-connecticuts-answer-to-pizza-rat',
        },
      }, { body: article }).as('oldArticle')

      cy.visit('/news/extra-extra-meet-connecticuts-answer-to-pizza-rat')
      cy.wait('@oldArticle').then(() => {
        cy.wait(500)
        cy.get('h2.regwall-header').should('not.exist')
      })
    })
  })
  it('does not show the content wall on sponsored articles', () => {
    cy.clearCookie('__gothamistNewsletterMember')

    cy.fixture('aviary/article.json').then((article) => {
      article.publication_date = new Date('1990-01-01').toISOString()
      article.meta.first_published_at = new Date('1990-01-01').toISOString()
      article.sponsored_content = true
      cy.intercept({
        pathname: '/api/v2/pages/find',
        query: {
          html_path: 'news/extra-extra-meet-connecticuts-answer-to-pizza-rat',
        },
      }, { body: article }).as('oldArticle')

      cy.visit('/news/extra-extra-meet-connecticuts-answer-to-pizza-rat')
      cy.wait('@oldArticle').then(() => {
        cy.wait(500)
        cy.get('h2.regwall-header').should('not.exist')
      })
    })
  })
  it('does not show the content wall on articles with tags in the ignorelist', () => {
    cy.clearCookie('__gothamistNewsletterMember')

    cy.fixture('aviary/article.json').then((article) => {
      article.publication_date = new Date('1990-01-01').toISOString()
      article.meta.first_published_at = new Date('1990-01-01').toISOString()
      // 'covid-19' slug is set as a fallback for the allow list in nuxt.config.ts
      // i don't know of any good way to override nuxt's runtimeconfig from within cypress
      article.tags = [{ name: 'news', slug: 'news' }, { name: 'covid-19', slug: 'covid-19' }]
      cy.intercept({
        pathname: '/api/v2/pages/find',
        query: {
          html_path: 'news/extra-extra-meet-connecticuts-answer-to-pizza-rat',
        },
      }, { body: article }).as('oldArticle')

      cy.visit('/news/extra-extra-meet-connecticuts-answer-to-pizza-rat')
      cy.wait('@oldArticle').then(() => {
        cy.wait(500)
        cy.get('h2.regwall-header').should('not.exist')
      })
    })
  })
  it('hides and shows the fixed header', () => {
    cy.visit('/news/extra-extra-meet-connecticuts-answer-to-pizza-rat')
    cy.wait('@article')
    cy.get('.article-page-header').should('not.exist')
    cy.scrollTo(0, 500)
    cy.wait(300)
    cy.get('.article-page-header').should('exist')
    cy.scrollTo(0, 0)
    cy.wait(300)
    cy.get('.article-page-header').should('not.exist')
  })
  it('has no detectable critical a11y violations on load', () => {
    cy.visit('/news/extra-extra-meet-connecticuts-answer-to-pizza-rat')
    cy.wait('@article')
    cy.injectAxe()
    cy.checkA11y(null, {
      retries: 3,
      interval: 500,
      includedImpacts: ['critical'],
    })
  })
})
