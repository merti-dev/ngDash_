describe('Landing navigation', () => {
  it('opens Dashboard when Get Started is clicked', () => {
    cy.visit('/');                           
    cy.get('[data-cy=get-started]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });
});
