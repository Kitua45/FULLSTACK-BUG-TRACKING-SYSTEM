describe("Admin Dashboard Display - Desktop View", () => {
  const adminEmail = "gracemumbua@gmail.com";
  const adminPassword = "grace123";

  beforeEach(() => {
    // desktop viewport
    cy.viewport(1440, 900);
    cy.visit("/login");
  });

  it("should log in as admin and display admin dashboard", () => {
    // Fill in login form
    cy.get('[data-test="login-email"]').type(adminEmail);
    cy.get('[data-test="login-password"]').type(adminPassword);
    cy.get('[data-test="login-submit"]').click();

    //  redirected to admin dashboard
    cy.url({ timeout: 10000 }).should("include", "/admin/dashboard");

    // Check that the welcome/profile section is visible
    cy.contains("Welcome to your Admin dashboard", { timeout: 10000 }).should("be.visible");

    // check that the main content area exists
    cy.get("main").should("exist");
  });
});
