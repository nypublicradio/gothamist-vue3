import { axeConfig, logViolations } from '../support/config'

describe('The home page', () => {
  beforeEach(() => {
    cy.loadGlobalFixtures()
    cy.intercept({
      pathname: '/api/v2/pages/',
      query: {
        type: 'news.ArticlePage',
        fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
        order: '-publication_date',
        show_on_index_listing: 'true',
        limit: '16',
      },
    }, { fixture: 'aviary/latest.json' }).as('latest')
    cy.intercept({
      pathname: '/api/v2/pages/',
      query: {
        type: 'news.ArticlePage',
        fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
        order: '-publication_date',
        show_on_index_listing: 'true',
        limit: '10',
        offset: '16',
      },
    }, { fixture: 'aviary/index-more.json' }).as('indexMore')
    cy.intercept({
      pathname: '/api/v2/pages/find',
      query: { html_path: '/' },
    }, { fixture: 'aviary/index.json' }).as('index')
  })
  it('successfully loads', () => {
    cy.visit('/')
    cy.wait(['@index', '@latest'])
    cy.get('.homepage-topper').should('exist')
    cy.get('.homepage-topper .gothamist-card:not(.hidden)').should('have.length', 6)
    cy.get('.homepage-topper .gothamist-card:not(.hidden)').eq(5).should('have.attr', 'id', 'ntv-latest-1')
    cy.get('.newsletter-home').should('exist')
    // cy.get('.center-feature').should('exist')
    // cy.get('.center-feature .gothamist-card:not(.hidden)').should('have.length', 6)
    cy.get('.left-feature').should('exist')
    cy.get('.left-feature .gothamist-card:not(.hidden)').should('have.length', 5)
    cy.get('.boroughs').should('exist')
    cy.get('#ntv-stream-2').should('exist')
    cy.get('#articleList').should('exist')
    cy.get('#articleList .gothamist-card:not(.hidden)').should('have.length', 10)
    cy.get('#articleList .gothamist-card:not(.hidden)').eq(1).should('have.attr', 'id', 'ntv-stream-3')
  })
  it('displays cards correctly', () => {
    cy.visit('/')
    cy.wait(['@index', '@latest'])
    cy.get('.gothamist-card').first().find('.image-with-caption').should('exist')
    cy.get('.gothamist-card').first().find('.card-title .h2').first().should('not.be.empty')
    cy.get('.gothamist-card').first().find('.card-slot').first().should('not.be.empty')
    cy.get('.gothamist-card').first().find('a.v-byline-author-name').first().should('not.be.empty')
    cy.get('.gothamist-card').eq(2).find('.image-with-caption').should('exist')
    cy.get('.gothamist-card').eq(2).find('.card-title .h2').first().should('not.be.empty')
    cy.get('.gothamist-card').eq(2).find('.card-slot').first().should('not.be.empty')
    cy.get('.gothamist-card').first().find('a.v-byline-author-name').first().should('not.be.empty')
  })
  it('loads more', () => {
    cy.visit('/')
    cy.wait(['@index', '@latest'])
    cy.contains('Load More').trigger('mouseover').click()
    cy.wait('@indexMore')
    cy.get('#articleList .gothamist-card').should('have.length', 20)
    cy.get('#articleList .card-title-link').eq(6).should('have.focus')
  })
  it('hides and shows the fixed header', () => {
    cy.visit('/')
    cy.get('.fixed-header').should('not.exist')
    cy.scrollTo(0, 600)
    cy.wait(400)
    cy.get('.fixed-header').should('exist')
    cy.scrollTo(0, 0)
    cy.wait(400)
    cy.get('.fixed-header').should('not.exist')
  })
  it('does not duplicate articles in latest news', () => {
    cy.visit('/')
    cy.wait(['@index', '@latest'])
    cy.get('.homepage-topper .gothamist-card:not(.hidden)').should('have.length', 6)
    cy.get('.homepage-topper .gothamist-card:not(.hidden)').eq(5).should('have.attr', 'id', 'ntv-latest-1')
    cy.get('#articleList').should('exist')
    cy.get('#articleList .gothamist-card:not(.hidden)').should('have.length', 10)
    cy.get('#articleList .gothamist-card:not(.hidden)').eq(1).should('have.attr', 'id', 'ntv-stream-3')
  })
  it('has no detectable a11y violations on load', () => {
    cy.visit('/')
    cy.wait(['@index', '@latest'])
    cy.injectAxe()
    cy.checkA11y(null, axeConfig, logViolations)
  })
})
