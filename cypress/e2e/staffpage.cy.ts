describe('A staff page', () => {
    it('successfully loads', () => {
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

        cy.visit('/staff/jen-chung')
        cy.get('.staff-articles .gothamist-card').should('have.length', 12)

        cy.contains('Load More').click()
        cy.wait('@staffMore')
        cy.get('.staff-articles .gothamist-card').should('have.length', 24)
    })
})