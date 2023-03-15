describe('A staff page', () => {
    beforeEach(() => {
        cy.loadGlobalFixtures()
        cy.intercept({
            pathname: '/api/v2/pages',
            query: {
                type: 'news.ArticlePage',
                fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
                order: '-publication_date',
                show_on_index_listing: 'true',
                author_slug: 'jen-chung',
                limit: '12',
                offset: '0'
            }
        }, {fixture: 'aviary/staff-articles.json'}).as('staffArticles')

        cy.intercept({
            pathname: '/api/v2/pages',
            query: {
                type: 'news.ArticlePage',
                fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
                order: '-publication_date',
                show_on_index_listing: 'true',
                author_slug: 'jen-chung',
                limit: '12',
                offset: '12'
            }
        }, {fixture: 'aviary/staff-more.json'}).as('staffMore')
    })
    it('successfully loads', () => {
        cy.visit('/staff/jen-chung')
        cy.get('#articleList .gothamist-card').should('have.length', 12)
    })
    it('loads more', () => {
        cy.visit('/staff/jen-chung')
        cy.contains('Load More').click()
        cy.wait('@staffMore')
        cy.get('#articleList .gothamist-card').should('have.length', 24)
        cy.get('#articleList .card-title-link').eq(12).should('have.focus')
    })
})