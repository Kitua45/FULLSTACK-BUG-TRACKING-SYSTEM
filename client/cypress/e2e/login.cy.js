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




  it("should login successfully with valid credentials", () => {
    cy.getDataTest("login-email").type("tracy@gmail.com");
    cy.getDataTest("login-password").type("tracy123");
    cy.getDataTest("login-submit").click();

    // success toast
    cy.contains("success").should("exist");

    // redirect (role based)
    cy.location("pathname").should("match", /dashboard/);
  });
});
