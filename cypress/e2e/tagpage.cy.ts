describe('A tag page', () => {
    it('successfully loads', () => {
        cy.loadGlobalFixtures()

        cy.intercept({
            pathname: '/api/v2/pages/find',
            query: { html_path: 'tags/dogs' }, 
        }, {fixture: 'aviary/tag-page.json'}).as('tagPage')
        cy.intercept({
            pathname: '/api/v2/pages',
            query: {
                type: 'news.ArticlePage',
                fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
                order: '-publication_date',
                show_on_index_listing: 'true',
                limit: '10',
                tag_slug: 'dogs'
            }
        }, {fixture: 'aviary/tag-articles.json'}).as('tagArticles')
        cy.intercept({
            pathname: '/api/v2/pages',
            query: {
                type: 'news.ArticlePage',
                fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
                order: '-publication_date',
                show_on_index_listing: 'true',
                limit: '10',
                offset: '10',
                tag_slug: 'dogs'
            }
        }, {fixture: 'aviary/tag-more.json'}).as('tagMore')

        cy.visit('/tags/dogs')
        cy.wait('@tagPage')
        cy.get('h1').contains('Doggos').should('exist')
        cy.get('.tag-page-header-image').should('exist')
        cy.get('.tag-page-top-zone').contains('Doggo ipsum').should('exist')
        cy.get('.tag-page-mid-zone').contains('Dog goes woof').should('exist')
        cy.get('.tag-river .gothamist-card').should('have.length', 10)

        cy.contains('Load More').click()
        cy.wait('@tagMore')
        cy.get('.tag-river .gothamist-card').should('have.length', 20)
    })
})