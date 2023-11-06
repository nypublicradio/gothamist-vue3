import { cypressConfig } from '../support/config'

describe('An information page', () => {
  beforeEach(() => {
    cy.loadGlobalFixtures()
  })
  it('shows preview for draft information pages', () => {
    cy.intercept(
      '/api/v2/page_preview/*',
      { fixture: 'aviary/preview-information-draft.json' },
    ).as('draftInformationPreview')
    cy.visit('/preview?identifier=abc&token=123')
    cy.wait('@draftInformationPreview')

    cy.get('h1').should('have.text', 'Another test information page')
    cy.get('.image').should('have.attr', 'alt', 'Grand Central Terminal in 1914, a year after opening.')
  })
  it('Has no detectable a11y violations on load', () => {
    cy.intercept(
      '/api/v2/page_preview/*',
      { fixture: 'aviary/preview-information-draft.json' },
    ).as('draftInformationPreview')
    cy.visit('preview?identifier=abc&token=123')
    cy.wait('@draftInformationPreview')

    cy.injectAxe()
    cy.checkA11y(null, cypressConfig)
  })
})
