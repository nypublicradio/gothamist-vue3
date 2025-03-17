import { axeConfig, logViolations } from '../support/config'

describe('A tag page', () => {
  beforeEach(() => {
    cy.loadGlobalFixtures()
    cy.intercept({
      pathname: '/api/v2/pages/find',
      query: { html_path: 'tags/dogs' },
    }, { fixture: 'aviary/tag-page.json' }).as('tagPage')
    cy.intercept({
      pathname: '/api/v2/pages',
      query: {
        type: 'news.ArticlePage',
        fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
        order: '-publication_date',
        show_on_index_listing: 'true',
        limit: '10',
        tag_slug: 'dogs',
      },
    }, { fixture: 'aviary/tag-articles.json' }).as('tagArticles')
    cy.intercept({
      pathname: '/api/v2/pages',
      query: {
        type: 'news.ArticlePage',
        fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
        order: '-publication_date',
        show_on_index_listing: 'true',
        limit: '10',
        offset: '10',
        tag_slug: 'dogs',
      },
    }, { fixture: 'aviary/tag-more.json' }).as('tagMore')
  })
  it('successfully loads', () => {
    cy.visit('/tags/dogs')
    cy.wait(['@tagPage', '@tagArticles'])
    cy.get('h1').contains('Doggos').should('exist')
    cy.get('.tag-page-header-image').should('exist')
    cy.get('.tag-page-top-zone').contains('Doggo ipsum').should('exist')
    cy.get('.tag-page-mid-zone').contains('Dog goes woof').should('exist')
    cy.get('#articleList .gothamist-card').should('have.length', 10)
  })
  it('loads more', () => {
    cy.visit('/tags/dogs')
    cy.wait('@tagArticles')
    cy.contains('Load More').trigger('mouseover').click()
    cy.wait('@tagMore')
    cy.get('#articleList .gothamist-card').should('have.length', 20)
    cy.get('#articleList .card-title-link').eq(10).should('have.focus')
  })
  it('shows preview for draft tag pages', () => {
    cy.intercept({
      pathname: '/api/v2/pages/find',
      query: { html_path: 'tags/bagels' },
    }, { fixture: 'aviary/tag-page.json' }).as('tagPage')
    cy.intercept(
      '/api/v2/page_preview/*',
      { fixture: 'aviary/preview-tagpage-draft.json' },
    ).as('draftTagpagePreview')

    cy.visit('/preview?identifier=abc&token=123')
    cy.wait('@draftTagpagePreview')
    cy.wait(1000)
    cy.get('h1').contains('Bagel Fest').should('exist')
    cy.get('.tag-page-top-zone').contains('Zombie ipsum').should('exist')
  })
  it('has no detectable a11y violations on load', () => {
    cy.visit('/tags/dogs')
    cy.wait(['@tagPage', '@tagArticles'])
    cy.injectAxe()
    cy.checkA11y(null, axeConfig, logViolations)
  })
})
