import { assert, expect } from 'vitest';
describe('The Homepage', () => {
  it('successfully loads', () => {
    cy.intercept('/api/v2/system_messages/*', {fixture: 'aviary/system_messages.json'}).as('systemMessages')
    cy.intercept('/api/v2/sitewide_components/*', {fixture: 'aviary/sitewide_components.json'}).as('sitewideComponents')
    cy.intercept('/api/v2/navigation/*', {fixture: 'aviary/navigation.json'}).as('navigation')
    cy.intercept('/api/v4/whats_on/**', {fixture: 'publisher/whats_on.json'}).as('whatsOn')
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
        limit: '6',
        offset: '6'
      }
    }, {fixture: 'aviary/index-more.json'}).as('index-more')
    cy.intercept({
        pathname: '/api/v2/pages/find',
        query: { html_path: '/' }, 
    }, {fixture: 'aviary/index.json'}).as('index')
    // cy.intercept({
    //   hostname: 'o557978.ingest.sentry.io'
    // }, {statusCode: 200, body: {}})
    cy.intercept({
      hostname: 'open-api.spot.im'
    }, {statusCode: 200, body: {messages_count: []}})
    cy.visit('/')

    cy.get('.marketing-modal').should('exist')
    cy.get('.p-dialog-header-close').click()

    cy.get('.homepage-topper').should('exist')
    cy.get('.homepage-topper .gothamist-card').should('have.length', 5)
    cy.get('.newsletter-home').should('exist')
    cy.get('.center-feature').should('exist')
    cy.get('.center-feature .gothamist-card:not(.hidden)').should('have.length', 6)
    cy.get('.boroughs').should('exist')
    cy.get('#latest').should('exist')
    cy.get('#latest .gothamist-card').should('have.length', 6)

    cy.contains('Load More').click()
    cy.wait('@index-more')
    cy.get('#latest .gothamist-card').should('have.length', 12) 
    
    cy.get('.card-title-link').first().click()
  })
})