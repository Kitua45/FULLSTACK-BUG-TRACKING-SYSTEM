/// <reference types="cypress" />

describe('Admin Comments CRUD E2E Test via DELETE Intercept', () => {
  const bugId = 4;
  const commentText = `Cypress Comment ${Date.now()}`;

  beforeEach(() => {
    cy.viewport(1920, 900);

    // Admin login
    cy.visit('/login');
    cy.get('[data-test="login-email"]').type('gracemumbua@gmail.com');
    cy.get('[data-test="login-password"]').type('grace123');
    cy.get('[data-test="login-submit"]').click();

    cy.url().should('include', '/admin/dashboard');
    cy.visit('/admin/dashboard/comments');
  });

  it('should create a comment for bug ID 4 and delete it', () => {
    // Intercept DELETE requests **before** triggering the delete
    cy.intercept('DELETE', '/comments/*').as('deleteCypressComment');

    // Create comment
    cy.get('[data-test="bugid-input"]').clear().type(`${bugId}`);
    cy.get('[data-test="comment-input"]').clear().type(commentText);
    cy.get('[data-test="submit-comment-button"]').click();

    // Confirm comment appears
    cy.contains(commentText).should('exist');

    // Delete the comment
    cy.contains(commentText)
      .closest('[data-test^="comment-item-"]')
      .within(() => {
        cy.get('[data-test^="delete-comment-"]').click();
      });

    // Wait for the DELETE request to finish
    cy.wait('@deleteCypressComment');

    // Confirm removal
    cy.contains(commentText).should('not.exist');
  });
});
