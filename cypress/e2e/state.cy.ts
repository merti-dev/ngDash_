describe('State calculation', () => {
  it('updates required salary when gross changes', () => {
    cy.visit('/dashboard');

    cy.get('[data-cy=gross-input]')
      .clear()
      .type('50000');

    cy.contains(/Required net/i)
      .should('contain.text', '€');
  });
});
