describe('Position Interface Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/position')
  })

  describe('Page Load Tests', () => {
    it('should display the position title correctly', () => {
      cy.get('[data-testid="position-title"]')
        .should('be.visible')
        .should('have.text', 'Position Dashboard')
    })

    it('should display all hiring phase columns', () => {
      cy.get('[data-testid="phase-column"]').should('have.length', 4)
      cy.contains('[data-testid="phase-column"]', 'Applied')
      cy.contains('[data-testid="phase-column"]', 'Interview')
      cy.contains('[data-testid="phase-column"]', 'Offer')
      cy.contains('[data-testid="phase-column"]', 'Hired')
    })

    it('should display candidate cards in correct columns', () => {
      cy.get('[data-testid="phase-Applied"] [data-testid="candidate-card"]')
        .should('exist')
        .each(($card) => {
          cy.wrap($card).should('have.attr', 'data-phase', 'Applied')
        })
    })
  })

  describe('Drag and Drop Tests', () => {
    it('should move candidate card to a different phase', () => {
      cy.get('[data-testid="phase-Applied"] [data-testid="candidate-card"]')
        .first()
        .as('sourceCard')

      cy.get('[data-testid="phase-Interview"]')
        .as('targetColumn')

      cy.get('@sourceCard')
        .drag('@targetColumn')

      cy.get('[data-testid="phase-Interview"]')
        .find('[data-testid="candidate-card"]')
        .should('exist')

      cy.intercept('PUT', '/api/candidate/*').as('updateCandidate')
      cy.wait('@updateCandidate').its('response.statusCode').should('eq', 200)
    })
  })
})