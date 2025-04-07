describe('Position Interface Tests', () => {
  beforeEach(() => {
    // Visit the position page before each test
    cy.visit('http://localhost:3000/position')
  })

  describe('Page Load Tests', () => {
    it('should display the position title correctly', () => {
      // Check title visibility and content
      cy.get('[data-testid="position-title"]')
        .should('be.visible')
        .should('have.text', 'Position Dashboard')
        .and('have.css', 'font-size')
        .and('not.be.empty')

      // Verify title position and styling
      cy.get('[data-testid="position-title"]')
        .should('have.css', 'margin-bottom')
        .and('not.be.empty')
    })

    it('should display all hiring phase columns', () => {
      cy.get('[data-testid="phase-column"]').should('have.length', 4)
      cy.contains('[data-testid="phase-column"]', 'Applied')
      cy.contains('[data-testid="phase-column"]', 'Interview')
      cy.contains('[data-testid="phase-column"]', 'Offer')
      cy.contains('[data-testid="phase-column"]', 'Hired')
    })

    it('should display candidate cards in correct columns', () => {
      // Verify candidates in Applied phase
      cy.get('[data-testid="phase-Applied"] [data-testid="candidate-card"]')
        .should('exist')
        .each(($card) => {
          cy.wrap($card).should('have.attr', 'data-phase', 'Applied')
        })
    })
  })

  describe('Drag and Drop Tests', () => {
    it('should move candidate card to a different phase', () => {
      // Get the first candidate card from Applied phase
      cy.get('[data-testid="phase-Applied"] [data-testid="candidate-card"]')
        .first()
        .as('sourceCard')

      // Get the Interview phase column as target
      cy.get('[data-testid="phase-Interview"]')
        .as('targetColumn')

      // Perform drag and drop
      cy.get('@sourceCard')
        .drag('@targetColumn')

      // Verify the card moved to Interview phase
      cy.get('[data-testid="phase-Interview"]')
        .find('[data-testid="candidate-card"]')
        .should('exist')

      // Verify API call was made
      cy.intercept('PUT', '/api/candidate/*').as('updateCandidate')
      cy.wait('@updateCandidate').its('response.statusCode').should('eq', 200)
    })
  })
})