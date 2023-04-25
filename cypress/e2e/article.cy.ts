describe('An article page', () => {
    beforeEach(() => {
        cy.loadGlobalFixtures()
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
    })
    it('successfully loads', () => {
        cy.visit('/news/extra-extra-meet-connecticuts-answer-to-pizza-rat')
        cy.wait('@article')

        cy.get('h1').should('exist')
        cy.get('.byline').should('exist')
        cy.get('.article-body').should('exist')
        cy.get('.tags').should('exist')
        cy.get('.author-profile').should('exist')
        cy.get('.recirculation').should('exist')
        cy.get('.recirculation .gothamist-card:not(.hidden)').should('have.length', 5)
    })
    it('shows the marketing CTAs', () => {
        cy.intercept(
            '/api/v2/system_messages/*', 
            {fixture: 'aviary/system_messages_bottom.json'}
        ).as('systemMessagesWithBottomCTA')

        cy.visit('/news/extra-extra-meet-connecticuts-answer-to-pizza-rat')
        cy.get('.marketing-modal').should('exist')
        cy.get('.p-dialog-header-close').click()
        cy.get('.marketing-modal').should('not.exist')
        cy.get('.article-donation-marketing-CTA').should('exist')
        cy.get('.article-donation-marketing-bottom-CTA').should('exist')
    })
})