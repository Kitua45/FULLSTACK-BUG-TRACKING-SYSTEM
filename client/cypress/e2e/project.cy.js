/// <reference types="cypress" />

describe('Projects CRUD E2E Test', () => {

    beforeEach(() => {
        cy.viewport(1920, 900);
        cy.loginAsAdmin();
        cy.visit('/admin/dashboard/projects');
        cy.contains(/Welcome to your Admin dashboard/i).should('be.visible');
    });

    it('should create → update → delete a project via the UI', () => {
        const projectTitle = `Cypress Project ${Date.now()}`;
        const projectDescription = 'Created by Cypress';
        const updatedTitle = `Updated Project ${Date.now()}`;
        const updatedDescription = 'Updated by Cypress';

        // ---------- CREATE ----------
        cy.get('[data-test="create-project-modal"]').then($dialog => $dialog[0].showModal());
        cy.get('[data-test="create-project-form"]').should('be.visible');
        cy.get('[data-test="create-project-title"]').type(projectTitle);
        cy.get('[data-test="create-project-description"]').type(projectDescription);
        cy.get('[data-test="create-project-status"]').select('active');
        cy.get('[data-test="create-project-created-by"]').type('5');
        cy.get('[data-test="create-project-submit"]').click();
        cy.contains(/Project created successfully/i).should('be.visible');
        cy.get('[data-test="create-project-modal"]').then($dialog => $dialog[0].close());
        cy.contains(projectTitle).should('exist');

        // ---------- UPDATE ----------
        // Click the update button to open the update modal
        cy.contains('tr', projectTitle).within(() => {
            cy.get('[data-test="update-project-button"]').click();
        });

        // Ensure update modal is visible
        cy.get('[data-test="update-project-modal"]').then($dialog => $dialog[0].showModal());
        cy.get('[data-test="update-project-modal"]').should('be.visible');

        // Update only title and description
        cy.get('[data-test="update-project-input-title"]').clear().type(updatedTitle);
        cy.get('[data-test="update-project-input-description"]').clear().type(updatedDescription);
        cy.get('[data-test="update-project-submit"]').click();

        cy.contains(/Project updated successfully/i).should('be.visible');
        cy.contains(updatedTitle).should('exist');
        cy.get('[data-test="update-project-modal"]').then($dialog => $dialog[0].close());

        // ---------- DELETE ----------
        // Click the delete button directly
        cy.contains('tr', updatedTitle).within(() => {
            cy.get('[data-test="delete-project-button"]').click();
        });

        // If a confirmation modal exists
        cy.get('[data-test="delete-project-modal"]').then($dialog => {
            if ($dialog.length) $dialog[0].showModal();
        });
        cy.get('[data-test="delete-project-confirm-button"]').click();

        cy.contains(/Project deleted successfully/i).should('be.visible');
        cy.contains(updatedTitle).should('not.exist');
        cy.get('[data-test="delete-project-modal"]').then($dialog => {
            if ($dialog.length) $dialog[0].close();
        });
    });
});
