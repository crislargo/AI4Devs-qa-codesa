describe('Position Interface Tests', () => {
  beforeEach(() => {
    cy.visitPosition()
    cy.interceptCandidateUpdate()
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

  describe('Candidate Phase Change Tests', () => {
    it('should move candidate from Applied to Interview', () => {
      cy.dragCandidateCard('Applied', 'Interview')
      cy.verifyCandidatePhase('Interview')
      cy.verifyCandidateUpdate()
    })

    it('should move candidate from Interview to Offer', () => {
      cy.dragCandidateCard('Interview', 'Offer')
      cy.verifyCandidatePhase('Offer')
      cy.verifyCandidateUpdate()
    })

    it('should move candidate from Offer to Hired', () => {
      cy.dragCandidateCard('Offer', 'Hired')
      cy.verifyCandidatePhase('Hired')
      cy.verifyCandidateUpdate()
    })
  })
})