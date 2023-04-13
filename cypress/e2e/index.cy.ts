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
        limit: '6',
        offset: '6'
      }
    }, {fixture: 'aviary/index-more.json'}).as('indexMore')
    cy.intercept({
        pathname: '/api/v2/pages/find',
        query: { html_path: '/' }, 
    }, {fixture: 'aviary/index.json'}).as('index')
  })
  it('successfully loads', () => {
    cy.visit('/')
    cy.wait(['@index','@latest'])
    cy.get('.homepage-topper').should('exist')
    cy.get('.homepage-topper .gothamist-card').should('have.length', 5)
    cy.get('.newsletter-home').should('exist')
    cy.get('.center-feature').should('exist')
    cy.get('.center-feature .gothamist-card:not(.hidden)').should('have.length', 6)
    cy.get('.boroughs').should('exist')
    cy.get('#articleList').should('exist')
    cy.get('#articleList .gothamist-card').should('have.length', 6)
  })
  it('displays cards correctly', () => {
    cy.visit('/')
    cy.wait('@latest')
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
    cy.wait('@latest')
    cy.contains('Load More').click()
    cy.wait('@indexMore')
    cy.get('#articleList .gothamist-card').should('have.length', 12)
    cy.get('#articleList .card-title-link').eq(6).should('have.focus')
  })
  it('shows the marketing modal', () => {
    cy.intercept(
      '/api/v2/system_messages/*', 
      {fixture: 'aviary/system_messages_bottom.json'}
    ).as('systemMessagesWithBottomCTA')

    cy.visit('/')
    cy.get('.marketing-modal').should('exist')
    cy.get('.p-dialog-header-close').click()
    cy.get('.marketing-modal').should('not.exist')
  })
})
