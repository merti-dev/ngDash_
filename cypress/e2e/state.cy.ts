// cypress/e2e/state.cy.ts
describe('State calculation', () => {
  it('updates required salary when gross changes', () => {
    cy.visit('/');                                // Landing
    cy.get('[data-cy=get-started]').click();      // navigate
    cy.url().should('include', '/dashboard');     // confirm

    cy.get('[data-cy=gross-input]')
      .clear()
      .type('50000');

    cy.contains(/Required net/i)
      .should('contain.text', '€');
  });
});
