describe('Social Network Feed', () => {
  it('scrolling down triggers the infinite scrolling', () => {
    cy.visit('/')

    cy.contains('Loading').should('be.visible')

    cy.scrollTo('bottom')

    cy.contains('Loading').should('be.visible')

    cy.get('.bg-card').should('have.length', 11)
  })
})
