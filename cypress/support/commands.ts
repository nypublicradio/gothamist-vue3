/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
  
Cypress.Commands.add('loadGlobalFixtures',  () => {
    cy.intercept('/api/v2/system_messages/*', {fixture: 'aviary/system_messages_empty.json'}).as('systemMessages')
    cy.intercept('/api/v2/sitewide_components/*', {fixture: 'aviary/sitewide_components.json'}).as('sitewideComponents')
    cy.intercept('/api/v2/navigation/*', {fixture: 'aviary/navigation.json'}).as('navigation')
    cy.intercept('/api/v4/whats_on/**', {fixture: 'publisher/whats_on.json'}).as('whatsOn')
    cy.intercept({
      hostname: 'open-api.spot.im'
    }, {statusCode: 200, body: {messages_count: []}}).as('commentCounts')
})

declare namespace Cypress {
  interface Chainable {
      loadGlobalFixtures(): Chainable<void>
  }
}
