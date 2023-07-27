describe('The home page', () => {
  beforeEach(() => {
    cy.loadGlobalFixtures()
    cy.intercept({
      pathname :'/api/v2/pages/',
      query: {
        type: 'news.ArticlePage',
        fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
        order: '-publication_date',
        show_on_index_listing: 'true',
        limit: '6'
      }
    }, {fixture: 'aviary/latest.json'}).as('latest')
    cy.intercept({
      pathname :'/api/v2/pages/',
      query: {
        type: 'news.ArticlePage',
        fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
        order: '-publication_date',
        show_on_index_listing: 'true',
        limit: '12'
      }
    }, {fixture: 'aviary/latest-plus.json'}).as('latestPlus')
    cy.intercept({
      pathname :'/api/v2/pages/',
      query: {
        type: 'news.ArticlePage',
        fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
        order: '-publication_date',
        show_on_index_listing: 'true',
        limit: '6',
        offset: '6'
      }
    }, {fixture: 'aviary/index-more.json'}).as('indexMore')
    cy.intercept({
        pathname: '/api/v2/pages/find',
        query: { html_path: '/' }, 
    }, {fixture: 'aviary/index.json'}).as('index')
  })
  it('handles case 0, original', () => {
    cy.setCookie('_experiment_homepage-latest-news-river', '0', {path: '/'})
    cy.visit('/')
    cy.wait(['@index','@latest'])
    cy.get('.homepage-topper').should('exist')
    cy.get('.homepage-topper .gothamist-card:not(.hidden)').should('have.length', 6)
    cy.get('.homepage-topper .gothamist-card:not(.hidden)').eq(5).should('have.attr', 'id', 'ntv-latest-1')
    cy.get('.newsletter-home').should('exist')
    cy.get('.center-feature').should('exist')
    cy.get('.center-feature .gothamist-card:not(.hidden)').should('have.length', 6)
    cy.get('.left-feature').should('exist')
    cy.get('.left-feature .gothamist-card:not(.hidden)').should('have.length', 4)
    cy.get('.boroughs').should('exist')
    cy.get('#ntv-stream-2').should('exist')
    cy.get('#articleList').should('exist')
    cy.get('#articleList .gothamist-card:not(.hidden)').should('have.length', 6)
    cy.get('#articleList .gothamist-card:not(.hidden)').eq(1).should('have.attr', 'id', 'ntv-stream-3')
    // in variant 0, first item in latest news header should equal first item in latest news river
    cy.get('.homepage-topper .gothamist-card:not(.hidden) div.h2').eq(2).invoke('text').then(headline => {
      cy.get('#articleList .gothamist-card:not(.hidden) div.h2').eq(0).should('have.text', headline)
    })
  })
  it('handles case 1, deduplicate river', () => {
    cy.setCookie('_experiment_homepage-latest-news-river', '1', {path: '/'})
    cy.visit('/')
    cy.wait(['@index','@latestPlus'])
    cy.get('.homepage-topper').should('exist')
    cy.get('.homepage-topper .gothamist-card:not(.hidden)').should('have.length', 6)
    cy.get('.homepage-topper .gothamist-card:not(.hidden)').eq(5).should('have.attr', 'id', 'ntv-latest-1')
    cy.get('.newsletter-home').should('exist')
    cy.get('.center-feature').should('exist')
    cy.get('.center-feature .gothamist-card:not(.hidden)').should('have.length', 6)
    cy.get('.left-feature').should('exist')
    cy.get('.left-feature .gothamist-card:not(.hidden)').should('have.length', 4)
    cy.get('.boroughs').should('exist')
    cy.get('#ntv-stream-2').should('exist')
    cy.get('#articleList').should('exist')
    cy.get('#articleList .gothamist-card:not(.hidden)').should('have.length', 6)
    cy.get('#articleList .gothamist-card:not(.hidden)').eq(1).should('have.attr', 'id', 'ntv-stream-3')
    // in variant 1, first item in latest news header should not equal first item in latest news river
    cy.get('.homepage-topper .gothamist-card:not(.hidden) div.h2').eq(2).invoke('text').then(headline => {
      cy.get('#articleList .gothamist-card:not(.hidden) div.h2').eq(0).should('not.have.text', headline)
    })
  })
  it('handles case 2, unknown variant', () => {
    // just a smoke test to make sure things still render
    cy.setCookie('_experiment_homepage-latest-news-river', '2', {path: '/'})
    cy.visit('/')
    cy.wait(['@index','@latest'])
    cy.get('.homepage-topper').should('exist')
    cy.get('.homepage-topper .gothamist-card:not(.hidden)').should('have.length', 6)
    cy.get('.homepage-topper .gothamist-card:not(.hidden)').eq(5).should('have.attr', 'id', 'ntv-latest-1')
    cy.get('.newsletter-home').should('exist')
    cy.get('.center-feature').should('exist')
    cy.get('.center-feature .gothamist-card:not(.hidden)').should('have.length', 6)
    cy.get('.left-feature').should('exist')
    cy.get('.left-feature .gothamist-card:not(.hidden)').should('have.length', 4)
    cy.get('.boroughs').should('exist')
    cy.get('#ntv-stream-2').should('exist')
    cy.get('#articleList').should('exist')
    cy.get('#articleList .gothamist-card:not(.hidden)').should('have.length', 6)
    cy.get('#articleList .gothamist-card:not(.hidden)').eq(1).should('have.attr', 'id', 'ntv-stream-3')
  })
})

