/// <reference types="cypress" />

Cypress.Commands.add('getDataTest', (dataTestSelector) => {
  return cy.get(`[data-test="${dataTestSelector}"]`);
});

Cypress.Commands.add('register', (firstName, lastName, email, password, confirmPassword) => {
  cy.visit('/register');
  cy.getDataTest('register-first-name').type(firstName);
  cy.getDataTest('register-last-name').type(lastName);
  cy.getDataTest('register-email').type(email);
  cy.getDataTest('register-password').type(password);
  cy.getDataTest('register-confirm-password').type(confirmPassword);
  cy.getDataTest('register-submit').click();
});

Cypress.Commands.add('loginAsAdmin', (email = 'gracemumbua@gmail.com', password = 'grace123') => {
  cy.visit('/login');
  cy.getDataTest('login-email').type(email);
  cy.getDataTest('login-password').type(password);
  cy.getDataTest('login-submit').click();
  cy.url().should('include', '/admin/dashboard');
  cy.contains('Welcome to your Admin dashboard').should('exist');
});

/* eslint-disable @typescript-eslint/no-namespace */
export {}

declare global {
  namespace Cypress {
    interface Chainable {
      getDataTest(value: string): Chainable<JQuery<HTMLElement>>;
      register(firstName: string, lastName: string, email: string, password: string, confirmPassword: string): void;
      loginAsAdmin(email?: string, password?: string): void;
    }
  }
}
