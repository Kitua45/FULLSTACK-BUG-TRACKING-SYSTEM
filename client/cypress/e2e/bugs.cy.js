/// <reference types="cypress" />

describe('Report Bug - User E2E Test', () => {

  const email = 'tracy@gmail.com';
  const password = 'tracy123';

  beforeEach(() => {
    cy.viewport(1920, 900);

    // Login
    cy.visit('/login');
    cy.get('[data-test="login-email"]').type(email);
    cy.get('[data-test="login-password"]').type(password);
    cy.get('[data-test="login-submit"]').click();

    cy.url().should('include', '/dashboard');
  });

  it('should report a bug successfully', () => {
    // Navigate to Bugs page
    cy.visit('/user/dashboard/bugs');

    // Open report bug modal
    cy.get('[data-test="create-bug-modal"]').then($modal => $modal[0].showModal());
    cy.get('[data-test="create-bug-form"]').should('be.visible');

    const bugTitle = `Cypress Bug ${Date.now()}`;
    const bugDescription = 'Bug reported by Cypress E2E';

    // Fill out numeric fields
    cy.get('[data-test="bug-projectid-input"]').clear().type('1');      // Project ID
    cy.get('[data-test="bug-reportedby-input"]').clear().type('1006'); // Reported By ID
    cy.get('[data-test="bug-assignedto-input"]').clear().type('1004'); // Assigned To ID

    // Fill out text fields
    cy.get('[data-test="bug-title-input"]').clear().type(bugTitle);
    cy.get('[data-test="bug-description-input"]').clear().type(bugDescription);

    // Select dropdowns
    cy.get('[data-test="bug-severity-select"]').select('high');
    cy.get('[data-test="bug-status-select"]').select('open');

    // Submit the form
    cy.get('[data-test="bug-submit-button"]').click();

    // Confirm success notification
    cy.contains(/Bug reported successfully/i).should('be.visible');

    // Verify bug appears in list
    cy.contains(bugTitle).should('exist');
  });

});
