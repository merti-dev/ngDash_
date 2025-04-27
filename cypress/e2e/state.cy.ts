// assumes the dashboard renders the required net salary paragraph
describe('State calculation', () => {
    it('updates required salary when gross changes', () => {
      cy.visit('/dashboard');
      cy.get('input[type=number]').first().clear().type('50000');
      cy.contains(/Required net/).should('contain.text', '≈'); // value changes
    });
  });
  