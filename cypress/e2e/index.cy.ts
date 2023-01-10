describe('The Homepage', () => {
  it('successfully loads', () => {
    cy.intercept('https://cms.demo.nypr.digital/api/v2/system_messages/2/', {fixture: 'aviary/index.json'}).as('getSystemMesasages')
    cy.intercept('https://cms.demo.nypr.digital/api/v2/sitewide_components/2/', {fixture: 'aviary/index.json'}).as('getSitewideComponents')
    cy.intercept('https://cms.prod.nypr.digital/api/v2/pages/?type=news.ArticlePage&fields=ancestry,description,lead_asset,legacy_id,listing_image,publication_date,show_as_feature,sponsored_content,tags,updated_date,url,uuid,listing_title,listing_summary,related_authors&order=-publication_date&show_on_index_listing=true&limit=6', {fixture: 'aviary/latest.json'}).as('getLatest')
    cy.intercept('https://cms.prod.nypr.digital/api/v2/pages/find?html_path=/', {fixture: 'aviary/index.json'}).as('getIndex')
    cy.visit('/')
    cy.wait(['@getSystemMessages', '@getSitewideComponents', '@getLatest, '@getIndex'])

    cy.get('h1').should('contain', 'Gothamist')
  })
})