
/// <reference types="cypress" />

context('Desafio Técnico QualityMap', () => {
  beforeEach(() => {
    cy.visit('https://demo.nopcommerce.com/')
  })

  describe('(Positivo) Registro de usuário', () => {
    it('(Positivo) Acessar tela inicial', () => { 
        cy.Valida_Login()
    });
    // Dado que acesso a tela inicial
    // Então a tela inicial é exibida

    it('(Positivo) Acessar tela de registro de usuário', () => {
      cy.contains('Register').click()
      cy.Valida_Registro()
    });
    // Dado que acesso a tela inicial
    // Quando clico em "Register"
    // Então a tela de cadastro de usuário é exibida

    it('(Positivo) Realiza registro de novo usuário', () => {
      cy.contains('Register').click()
      cy.Valida_Registro()
      cy.Preenche_Registro()
      cy.get('#Newsletter').uncheck().should('not.be.checked')
      cy.get('#register-button').click()
      cy.contains('Your registration completed').should('be.visible')
    });
  })
    // Dado que acesso a tela inicial
    // E clico em "Register"
    // Quando preencho corretamente as informações de cadastro de usuário
    // E clico em "Register"
    // Então deve ser exibida a mensagem "Your registration completed"


describe('(Negativo) Registro de usuário', () => {
    it('(Negativo) Realiza registro de usuário já existente', () => {
      // Para execução desse cenário, as vezes é preciso executá-lo mais de uma vez devido a questão da persistência de dados no site proposto
      cy.contains('Register').click()
      cy.Valida_Registro()
      cy.Preenche_Registro()
      cy.get('#Email').clear().type('teste@teste.com', { delay: 100 }).should('have.value', 'teste@teste.com')
      cy.get('#register-button').click()
      cy.contains('The specified email already exists').should('be.visible')
    });
    // Dado que acesso a tela inicial
    // E clico em "Register"
    // Quando preencho com usuário já existente as informações de cadastro de usuário
    // E clico em "Register"
    // Então deve ser exibida a mensagem "The specified email already exists"
    
    it('(Negativo) Realiza registro de usuário com email incorreto', () => {
      cy.contains('Register').click()
      cy.Valida_Registro()
      cy.Preenche_Registro()
      cy.get('#Email').clear().type('teste', { delay: 100 }).should('have.value', 'teste')
      cy.get('#register-button').click()
      cy.contains('Wrong email').should('be.visible')
    });
    // Dado que acesso a tela inicial
    // E clico em "Register"
    // Quando preencho com e-mail incorreto e insiro as informações de cadastro de usuário
    // E clico em "Register"
    // Então deve ser exibida a mensagem "Wrong email"

    it('(Negativo) Realiza registro de usuário com senhas divergentes', () => {
      cy.contains('Register').click()
      cy.Valida_Registro()
      cy.Preenche_Registro()
      cy.get('#Password').clear().type('senha123').should('have.value', 'senha123')
      cy.get('#ConfirmPassword').clear().type('senha321').should('have.value', 'senha321')
      cy.get('#register-button').click()
      cy.contains('The password and confirmation password do not match.').should('be.visible')
    });

    // Dado que acesso a tela inicial
    // E clico em "Register"
    // Quando preencho as informações com senha diferente da senha de confirmação
    // E clico em "Register"
    // Então deve ser exibida a mensagem "The password and confirmation password do not match."
})
  
})
