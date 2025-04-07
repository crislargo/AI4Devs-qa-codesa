// Import commands.js using ES2015 syntax:
import './commands'

// Import drag and drop plugin
import '@4tw/cypress-drag-drop'

// Custom command for verifying position interface elements
Cypress.Commands.add('verifyPositionInterface', () => {
  cy.get('[data-testid="position-title"]').should('be.visible')
  cy.get('[data-testid="phase-column"]').should('have.length', 4)
})

// Custom command for drag and drop operation
Cypress.Commands.add('dragCandidateCard', (sourcePhase, targetPhase) => {
  cy.get(`[data-testid="phase-${sourcePhase}"] [data-testid="candidate-card"]`)
    .first()
    .drag(`[data-testid="phase-${targetPhase}"]`)
})

// Custom command for verifying card movement
Cypress.Commands.add('verifyCandidatePhase', (phase, candidateId) => {
  cy.get(`[data-testid="phase-${phase}"]`)
    .find(`[data-testid="candidate-card"][data-id="${candidateId}"]`)
    .should('exist')
})