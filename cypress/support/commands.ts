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

declare module 'Cypress' {
  interface Chainable {
    loadGlobalFixtures(): Chainable<void>
  }
}

Cypress.Commands.add('loadGlobalFixtures', () => {
  cy.setCookie('_experiment_homepage-river', '0', { path: '/' })
  cy.intercept('/api/v2/system_messages/*', { fixture: 'aviary/system_messages_empty.json' }).as('systemMessages')
  cy.intercept('/api/v2/sitewide_components/*', { fixture: 'aviary/sitewide_components.json' }).as('sitewideComponents')
  cy.intercept('/api/v2/navigation/*', { fixture: 'aviary/navigation.json' }).as('navigation')
  cy.intercept('/api/v4/whats_on/**', { fixture: 'publisher/whats_on.json' }).as('whatsOn')
  cy.intercept({
    hostname: /([^.]*\.)+htlbid.com/,
  }, { statusCode: 200, body: '' }).as('htlbid')
  cy.intercept({
    hostname: /([^.]*\.)+doubleclick.net/,
  }, { statusCode: 200, body: '' }).as('doubleclick')
  cy.intercept({
    hostname: /([^.]*\.)+omappapi.com/,
  }, { statusCode: 200, body: '' }).as('optinMonster')
  cy.intercept({
    hostname: /([^.]*\.)+spot.im/,
  }, { statusCode: 200, body: '' }).as('openWeb')
  cy.intercept({
    hostname: /([^.]*\.)+sentry.io/,
  }, { statusCode: 200, body: '' }).as('sentry')
  cy.intercept({
    hostname: 'news.google.com',
  }, { statusCode: 200, body: '' }).as('googleNews')
  Cypress.on('uncaught:exception', (err, _runnable) => {
    if (err.message) {
      console.log('UNHANDLED ERROR:', err)
      return false
    }
    return false
  })
})
