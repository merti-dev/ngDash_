describe('State calculation', () => {
  it('updates required salary when gross changes', () => {
    cy.visit('/dashboard', { failOnStatusCode: false });   

    cy.get('[data-cy=gross-input]', { timeout: 15000 })
      .clear()
      .type('50000');

    cy.contains(/Required net/i).should('contain.text', '€');
  });
});
