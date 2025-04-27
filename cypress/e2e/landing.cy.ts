describe('Landing page', () => {
    it('loads and navigates to dashboard', () => {
      cy.visit('/');
      cy.contains('Get Started').click();
      cy.url().should('include', '/dashboard');
      cy.contains('Dashboard').should('be.visible');
    });
  });
  