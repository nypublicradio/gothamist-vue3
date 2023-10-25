describe('A section page', () => {
  beforeEach(() => {
    cy.loadGlobalFixtures()
    cy.intercept({
      pathname: '/api/v2/pages/find',
      query: {
        html_path: 'news',
      },
    }, { fixture: 'aviary/section-page.json' }).as('sectionPage')
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
    }, { fixture: 'aviary/section-recirculation.json' }).as('sectionRecirculation')
    cy.intercept({
      pathname: '/api/v2/pages',
      query: {
        type: 'news.ArticlePage',
        fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
        order: '-publication_date',
        show_on_index_listing: 'true',
        sponsored_content: 'false',
        descendant_of: '4',
        offset: '5',
      },
    }, { fixture: 'aviary/section-articles.json' }).as('sectionArticles')
    cy.intercept({
      pathname: '/api/v2/pages',
      query: {
        type: 'news.ArticlePage',
        fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
        order: '-publication_date',
        show_on_index_listing: 'true',
        sponsored_content: 'false',
        descendant_of: '4',
        limit: '10',
        offset: '25',
      },
    }, { fixture: 'aviary/section-more.json' }).as('sectionMore')
  })
  it('successfully loads', () => {
    cy.visit('/news')
    cy.wait('@sectionArticles')
    cy.get('#article-recirculation').should('exist')
    cy.get('#article-recirculation .gothamist-card:not(.hidden)').should('have.length', 5)
    cy.get('#articleList').should('exist')
    cy.get('#articleList .gothamist-card').should('have.length', 20)
  })
  it('displays cards correctly', () => {
    cy.visit('/news')
    cy.wait('@sectionArticles')
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
    cy.visit('/news')
    cy.wait('@sectionArticles')
    cy.contains('Load More').click()
    cy.wait('@sectionMore')
    cy.get('#articleList .gothamist-card').should('have.length', 30)
    cy.get('#articleList .card-title-link').eq(20).should('have.focus')
  })
  it('has no detectable critical a11y violations on load', () => {
    cy.visit('/news')
    cy.wait('@sectionArticles')
    cy.injectAxe()
    cy.checkA11y(null, {
      retries: 3,
      interval: 200,
      includedImpacts: ['critical'],
    })
  })
  it('has no detectable a11y violations of any severity on load (report only)', () => {
    cy.visit('/news')
    cy.wait('@sectionArticles')
    cy.injectAxe()
    cy.checkA11y(null, {
      retries: 3,
      interval: 200,
    }, null, true)
  })
})
