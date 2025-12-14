describe('About Section Tests', () => {
  it('should visit About page and check all sections', () => {
    // Visit About page
    cy.visit("/about");

    // Check URL
    cy.location("pathname").should("equal", "/about");

    // HERO SECTION
    cy.getDataTest('About-heading').should('contain.text', 'About BugTracker');
    cy.getDataTest('about-description').should('contain.text', 'BugTracker is a powerful platform');

    // MISSION & VISION
    cy.getDataTest('mission-heading').should('contain.text', 'Our Mission');
    cy.getDataTest('mission-description').should('contain.text', 'To empower teams to deliver better software');

    cy.getDataTest('vision-heading').should('contain.text', 'Our Vision');
    cy.getDataTest('vision-description').should('contain.text', 'To be the leading bug tracking solution');

    // FEATURES / VALUES
    cy.getDataTest('features-heading').should('contain.text', 'Why Choose BugTracker?');

    cy.getDataTest('feature-real-time-monitoring-title').should('contain.text', 'Real-Time Monitoring');
    cy.getDataTest('feature-real-time-monitoring-desc').should('contain.text', 'Track bugs and issues instantly');

    cy.getDataTest('feature-smart-reporting-title').should('contain.text', 'Smart Reporting');
    cy.getDataTest('feature-smart-reporting-desc').should('contain.text', 'Generate detailed reports');

    cy.getDataTest('feature-seamless-collaboration-title').should('contain.text', 'Seamless Collaboration');
    cy.getDataTest('feature-seamless-collaboration-desc').should('contain.text', 'Keep your team aligned');
  });
});

