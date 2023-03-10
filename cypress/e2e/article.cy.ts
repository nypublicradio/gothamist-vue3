describe('An Article Page', () => {
    it('successfully loads', () => {
        cy.intercept('/api/v2/system_messages/*', {fixture: 'aviary/system_messages.json'}).as('systemMessages')
        cy.intercept('/api/v2/sitewide_components/*', {fixture: 'aviary/sitewide_components.json'}).as('sitewideComponents')
        cy.intercept('/api/v2/navigation/*', {fixture: 'aviary/navigation.json'}).as('navigation')
        cy.intercept('/api/v4/whats_on/**', {fixture: 'publisher/whats_on.json'}).as('whatsOn')

        cy.intercept({
            pathname: '/api/v2/pages/find',
            query: {
                html_path: 'news/extra-extra-meet-connecticuts-answer-to-pizza-rat'
            }
        }, {fixture: 'aviary/article.json'}).as('article')
        cy.intercept({
            pathname: '/api/v2/pages/find',
            query: {
                html_path: 'news'
            }
        }, {fixture: 'aviary/news-page.json'}).as('newsPage')
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
        }, {fixture: 'aviary/more-news.json'}).as('moreNews')

        cy.visit('/news/extra-extra-meet-connecticuts-answer-to-pizza-rat')
        cy.wait('@article')
        cy.get('h1').should('exist')
        cy.get('.byline').should('exist')
        cy.get('.byline').should('exist')
        cy.get('.article-donation-marketing-CTA').should('exist')
        cy.get('.article-body').should('exist')
        cy.get('.article-donation-marketing-bottom-CTA').should('exist')
        cy.get('.tags').should('exist')
        cy.get('.author-profile').should('exist')
        cy.get('.recirculation').should('exist')
        cy.get('.recirculation .gothamist-card:not(.hidden)').should('have.length', 5)
    })
})