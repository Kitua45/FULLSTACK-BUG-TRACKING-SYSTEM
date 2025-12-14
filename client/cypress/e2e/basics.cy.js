describe('Hero Section Tests', () => {
  it('should render Hero section correctly', () => {
    cy.visit('/')

    // Check the URL
    cy.location("pathname").should("equal", "/")

    // Check the main header text
    cy.get('h1')
      .contains("Track Bugs Efficiently.")
      .should('be.visible')
    cy.get('h1 span')
      .contains("Deliver Better Software.")
      .should('be.visible')

    // Check the paragraphs
    cy.get('p')
      .eq(0)
      .contains("A powerful collaboration tool for developers, testers, and managers")
      .should('be.visible')

    cy.get('p')
      .eq(1)
      .contains("Stay ahead with real-time bug monitoring, smart reporting,")
      .should('be.visible')

    // Check the hero image is visible
    cy.get('img[alt="Bug Tracking Illustration"]')
      .should('be.visible')
      .and(($img) => {
        // Ensure the image has loaded
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })

    // Optional: check the section background image is applied
    cy.get('section')
      .should('have.css', 'background-image')
      .and('include', 'hero4.jpg')
  })


  
})

                