/// <reference types="cypress" />

describe('Projects CRUD E2E Test (Create → Delete)', () => {

    beforeEach(() => {
        cy.viewport(1920, 900);

        // Login as admin
        cy.visit('/login');
        cy.get('[data-test="login-email"]').type('gracemumbua@gmail.com');
        cy.get('[data-test="login-password"]').type('grace123');
        cy.get('[data-test="login-submit"]').click();

        cy.url().should('include', '/admin/dashboard');
        cy.visit('/admin/dashboard/projects');
        cy.contains(/Welcome to your Admin dashboard/i).should('be.visible');
    });

    it('should create → delete the same project', () => {

        const projectTitle = `Cypress Project ${Date.now()}`;
        const projectDescription = 'Created by Cypress';

        // ---------- CREATE ----------
        cy.get('[data-test="create-project-modal"]').then($d => $d[0].showModal());
        cy.get('[data-test="create-project-form"]').should('be.visible');

        cy.get('[data-test="create-project-title"]').type(projectTitle);
        cy.get('[data-test="create-project-description"]').type(projectDescription);
        cy.get('[data-test="create-project-status"]').select('active');
        cy.get('[data-test="create-project-created-by"]').type('5');

        cy.get('[data-test="create-project-submit"]').click();
        cy.contains(/Project created successfully/i).should('be.visible');

        cy.get('[data-test="create-project-modal"]').then($d => $d[0].close());

        // Confirm project exists in table
        cy.contains('tr', projectTitle).should('exist');

        // ---------- DELETE ----------
        // Intercept DELETE request before triggering
        cy.intercept('DELETE', '/projects/*').as('deleteProject');

        cy.contains('tr', projectTitle).within(() => {
            cy.get('[data-test="delete-project-button"]').click();
        });

        cy.get('[data-test="delete-project-confirm-button"]').click();

        // Wait for DELETE request to complete
        cy.wait('@deleteProject');

        cy.contains(/Project deleted successfully/i).should('be.visible');

        // Confirm project is gone
        cy.contains(projectTitle).should('not.exist');
    });
});
