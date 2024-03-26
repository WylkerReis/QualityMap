import faker from 'faker';

Cypress.Commands.add('Valida_Registro',() => {
    cy.url().should('include', '/register')
    cy.contains('First name').should('be.visible')
    cy.contains('Last name').should('be.visible')
    cy.contains('Email').should('be.visible')
    cy.contains('Date of birth').should('be.visible')
    cy.contains('Company name').should('be.visible')
    cy.contains('Password').should('be.visible')
    cy.contains('Confirm password').should('be.visible')
})

Cypress.Commands.add('Preenche_Data_Registro', () => {
    const nascimentoDia = Cypress._.random(1, 28)
    const nascimentoMes = Cypress._.random(1, 12)
    const nascimentoAno = Cypress._.random(1914, 2024) 
    cy.get('[name="DateOfBirthDay"]').select(nascimentoDia.toString())
    cy.get('[name="DateOfBirthDay"]').should('have.value', nascimentoDia.toString())
    cy.get('[name="DateOfBirthMonth"]').select(nascimentoMes)
    cy.get('[name="DateOfBirthMonth"]').should('have.value', nascimentoMes)
    cy.get('[name="DateOfBirthYear"]').select(nascimentoAno.toString())
    cy.get('[name="DateOfBirthYear"]').should('have.value', nascimentoAno.toString())
    
})

Cypress.Commands.add('Preenche_Registro', () => {
    cy.Preenche_Dados_Registro()
    cy.Preenche_Data_Registro()
    cy.get('#Newsletter').should('be.checked')
})

Cypress.Commands.add('Preenche_Dados_Registro', () => {
    const primeiroNome = faker.name.firstName();
    const ultimoNome = faker.name.lastName();
    const email = faker.internet.email();
    const senha = faker.internet.password();
   

    cy.get('#FirstName').type(primeiroNome)
    cy.get('#FirstName').should('have.value', primeiroNome)

    cy.get('#LastName').type(ultimoNome)
    cy.get('#LastName').should('have.value', ultimoNome)

    cy.get('#Email').type(email, { delay: 100 })
    cy.get('#Email').should('have.value', email)

    cy.get('#Password').type(senha)
    cy.get('#Password').should('have.value', senha)

    cy.get('#ConfirmPassword').type(senha)
    cy.get('#ConfirmPassword').should('have.value', senha)
})

Cypress.Commands.add('Preenche_Nome', () => {
    cy.get('#FirstName').type('teste')
    cy.get('#FirstName').should('have.value', 'teste')

    cy.get('#LastName').type('teste')
    cy.get('#LastName').should('have.value', 'teste')
})

Cypress.Commands.add('Preenche_Senha', () => {
    cy.get('#Password').type('senha123')
    cy.get('#Password').should('have.value', 'senha123')

    cy.get('#ConfirmPassword').type('senha123')
    cy.get('#ConfirmPassword').should('have.value', 'senha123')

})