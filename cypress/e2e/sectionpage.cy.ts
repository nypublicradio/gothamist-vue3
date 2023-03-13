describe('A section page', () => {
    it('successfully loads', () => {
        cy.loadGlobalFixtures()
        cy.intercept({
            pathname: '/api/v2/pages/find',
            query: {
                html_path: 'news'
            }
        }, {fixture: 'aviary/section-page.json'}).as('sectionPage')
        cy.intercept({
            pathname: '/api/v2/pages',
            query: {
                type: 'news.ArticlePage',
                fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
                order: '-publication_date',
                show_on_index_listing: 'true',
                sponsored_content: 'false',
                descendant_of: '4',
                limit: '6'
            }
        }, {fixture: 'aviary/section-recirculation.json'}).as('sectionRecirculation')
        cy.intercept({
            pathname: '/api/v2/pages',
            query: {
                type: 'news.ArticlePage',
                fields: 'ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors',
                order: '-publication_date',
                show_on_index_listing: 'true',
                sponsored_content: 'false',
                descendant_of: '4',
                offset: '5'
            }
        }, {fixture: 'aviary/section-articles.json'}).as('sectionArticles')
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
                offset: '25'
            }
        }, {fixture: 'aviary/section-more.json'}).as('sectionMore')
        cy.visit('/news')
        cy.get('#article-recirculation').should('exist')
        cy.get('#article-recirculation .gothamist-card:not(.hidden)').should('have.length', 5)
        cy.get('.section-river').should('exist')
        cy.get('.section-river .gothamist-card').should('have.length', 20)
        
        cy.contains('Load More').click()
        cy.wait('@sectionMore')
        cy.get('.section-river .gothamist-card').should('have.length', 30)

    })
})