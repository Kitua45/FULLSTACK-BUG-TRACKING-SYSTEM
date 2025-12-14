describe('Register Page Tests', () => {
  beforeEach(() => {
    cy.visit('/register');
    cy.location('pathname').should('equal', '/register');
  });

  it('should display all form fields', () => {
    cy.getDataTest('register-first-name').should('exist');
    cy.getDataTest('register-last-name').should('exist');
    cy.getDataTest('register-email').should('exist');
    cy.getDataTest('register-password').should('exist');
    cy.getDataTest('register-confirm-password').should('exist');
    cy.getDataTest('register-submit').should('exist');
  });

  it('should show validation errors for empty fields', () => {
    cy.getDataTest('register-submit').click();

    cy.contains('First name is required').should('be.visible');
    cy.contains('Last name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
    cy.contains('Confirm password is required').should('be.visible');
  });

  it('should show validation error for invalid email', () => {
    cy.getDataTest('register-first-name').type('Agnes');
    cy.getDataTest('register-last-name').type('Kitua');
    cy.getDataTest('register-email').type('invalidemail');
    cy.getDataTest('register-password').type('password123');
    cy.getDataTest('register-confirm-password').type('password123');

    cy.getDataTest('register-submit').click();

    cy.contains('Invalid email').should('be.visible');
  });

  it('should show validation error when passwords do not match', () => {
    cy.getDataTest('register-first-name').type('Agnes');
    cy.getDataTest('register-last-name').type('Kitua');
    cy.getDataTest('register-email').type('agnes@test.com');
    cy.getDataTest('register-password').type('password123');
    cy.getDataTest('register-confirm-password').type('password321');

    cy.getDataTest('register-submit').click();

    cy.contains('Password must match').should('be.visible');
  });

  it('should allow user to fill and submit the form and redirect to verify page', () => {
    cy.getDataTest('register-first-name').type('Agnes');
    cy.getDataTest('register-last-name').type('Kitua');
    cy.getDataTest('register-email').type(`agnes${Date.now()}@test.com`);
    cy.getDataTest('register-password').type('password123');
    cy.getDataTest('register-confirm-password').type('password123');

    cy.getDataTest('register-submit').click();

    
    //  Assert redirect instead (reliable)
    cy.location('pathname', { timeout: 5000 }).should('equal', '/verify');
  });
});
