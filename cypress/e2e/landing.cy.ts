describe('Landing navigation', () => {
  it('opens Dashboard when Get Started is clicked', () => {
    cy.visit('/');                           
    cy.contains('Get Started', { timeout: 15000 }).click();
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });
});
