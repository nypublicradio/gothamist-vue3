describe('The newsletter page', () => {
  beforeEach(() => {
    cy.loadGlobalFixtures()
  })
  it('successfully loads', () => {
      cy.visit('/newsletters')
  })
  it('submits correctly', () => {
    const emailAddress = 'test@example.com'
    cy.intercept(
      'email-proxy/subscribe',
      req => {
        expect(req.body.email).to.eq(emailAddress)
        expect(req.body.list).to.eq('Gothamist++We The Commuters++Politics Brief')
        expect(req.body.source).to.eq('gothamist')
    })
    cy.visit('/newsletters')
    cy.get('.newsletter-form input').first().type(emailAddress)
    cy.get('#sign-up').click()
    cy.get('.newsletter-form').contains('Thank you for signing up!')
  })
  it("should be disabled when there are form errors", () => {
    const spy = cy.spy()
    cy.intercept('email-proxy/subscribe', spy)

    cy.visit('/newsletters')
    cy.get('#sign-up').should('have.attr', 'aria-disabled')
    cy.get('#sign-up').should('not.have.attr', 'type', 'submit')

    // fill in email, but uncheck agree
    cy.get('.newsletter-form input').first().type('test@example.com') 
    cy.get('.newsletter-agree input[type=checkbox]').click({force: true} )

    cy.get('#sign-up').should('have.attr', 'aria-disabled')
    cy.get('#sign-up').should('not.have.attr', 'type', 'submit')

    // recheck agree, but uncheck all newsletters
    cy.get('.newsletter-agree input[type=checkbox]').click({force: true}) 
    cy
    .get('.newsletter-checkbox .p-checkbox-checked input[type=checkbox]')
    .each(($btn) => {
      cy.wrap($btn).click({force: true} )
    })

    cy.get('#sign-up').should('have.attr', 'aria-disabled')
    cy.get('#sign-up').should('not.have.attr', 'type', 'submit')
  })
})