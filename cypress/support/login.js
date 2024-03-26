Cypress.Commands.add('Valida_Login',() => {
    cy.get('.header-logo').should('be.visible')
    cy.get('#small-searchterms').should('be.visible')
    cy.contains('Register').should('be.visible')
    cy.contains('Log in').should('be.visible')
    cy.contains('Wishlist').should('be.visible')
})
