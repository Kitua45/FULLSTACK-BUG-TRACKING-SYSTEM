describe("Login Page Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.location("pathname").should("eq", "/login");
  });

  it("should display login form fields", () => {
    cy.getDataTest("login-title").should("contain", "Login");
    cy.getDataTest("login-email").should("exist");
    cy.getDataTest("login-password").should("exist");
    cy.getDataTest("login-submit").should("exist");
  });

  it("should show validation errors when submitting empty form", () => {
    cy.getDataTest("login-submit").click();

    cy.contains("Email is required").should("exist");
    cy.contains("Password is required").should("exist");
  });

  it("should show invalid email error", () => {
    cy.getDataTest("login-email").type("invalidemail");
    cy.getDataTest("login-submit").click();

    cy.contains("Invalid email").should("exist");
  });

  it("should login successfully with valid credentials", () => {
    cy.getDataTest("login-email").type("testuser@test.com");
    cy.getDataTest("login-password").type("password123");
    cy.getDataTest("login-submit").click();

    // success toast
    cy.contains("success").should("exist");

    // redirect (role based)
    cy.location("pathname").should("match", /dashboard/);
  });
});
