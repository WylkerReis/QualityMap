import faker from 'faker';

describe('Testes de API', () => {
  let authToken;

  before(() => {
    cy.request('POST', 'https://serverest.dev/login', {
      email: 'fulano@qa.com',
      password: 'teste'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('authorization');
      authToken = response.body.authorization;
    });
  });

  it('Retorna lista de usuários', function () {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/usuarios',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('object').and.have.property('usuarios');
    });
  });

  it('Criar novo usuário', function () {
    const dadosUsuarios = {
      nome: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: 'true'
    };
    
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      body: dadosUsuarios
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id').and.not.be.empty;
    });
  });

  it('Atualizar usuário', function () {
    const dadosUsuarios = {
      nome: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: 'true'
    };

    cy.request({
      method: 'PUT',
      url: 'https://serverest.dev/usuarios/1',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      body: dadosUsuarios
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id').and.not.be.empty;

    });
  });

  it('Deletar usuário', function () {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/usuarios',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('usuarios').and.to.be.an('array').and.not.be.empty;

      const usuarioNaoDeletavel = response.body.usuarios.find(user => user._id === '0uxuPY0cbmQhpEz1');
      expect(usuarioNaoDeletavel).to.exist;

      const usuarios = response.body.usuarios.filter(user => user._id !== '0uxuPY0cbmQhpEz1');
      const usuarioAleatorio = Cypress._.sample(usuarios);
      const idUsuario = usuarioAleatorio._id;

  
      cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/usuarios/${idUsuario}`,
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
        expect(deleteResponse.body).to.have.property('message', 'Registro excluído com sucesso');
      });
    });
  });
  

  it('Retorna lista produtos', () => {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/produtos',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('object').and.have.property('produtos');
      expect(response.body.produtos).to.be.an('array').and.not.be.empty;
      const products = response.body.produtos;

      products.forEach((product) => {
        expect(product).to.have.property('nome').and.to.be.a('string').and.not.be.empty;
        expect(product).to.have.property('preco').and.to.be.a('number').and.to.be.at.least(0); 
        expect(product).to.have.property('descricao').and.to.be.a('string').and.not.be.empty;
        expect(product).to.have.property('quantidade').and.to.be.a('number').and.to.be.at.least(0); 
        expect(product).to.have.property('_id').and.to.be.a('string').and.not.be.empty;
      });
    });
  });
  
  it('Insere novo produto', () => {
    // Cenário falhando devido a falha na autorização, mesmo método de autorização utilizado em cenários acima, nada que indique autorização especial no https://serverest.dev/#/Produtos/post_produtos
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      body: {
        nome: 'Produto teste',
        preco: 10.99,
        descricao: 'Descrição Teste',
        quantidade: 381
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id').and.not.be.empty;
    });
  });

  it('Retorna lista de carrinhos', () => {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/carrinhos',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('object').that.has.property('carrinhos');
      expect(response.body.carrinhos).to.be.an('array').and.not.be.empty;
  
      const carts = response.body.carrinhos;
      carts.forEach((cart) => {
        expect(cart).to.have.property('produtos').and.to.be.an('array').and.not.be.empty;
        expect(cart).to.have.property('precoTotal').and.to.be.a('number').and.to.be.at.least(0);
        expect(cart).to.have.property('quantidadeTotal').and.to.be.a('number').and.to.be.at.least(0);
        expect(cart).to.have.property('idUsuario').and.to.be.a('string').and.not.be.empty;
        expect(cart).to.have.property('_id').and.to.be.a('string').and.not.be.empty;
  
        cart.produtos.forEach((product) => {
          expect(product).to.have.property('idProduto').and.to.be.a('string').and.not.be.empty;
          expect(product).to.have.property('quantidade').and.to.be.a('number').and.to.be.at.least(0);
          expect(product).to.have.property('precoUnitario').and.to.be.a('number').and.to.be.at.least(0);
        });
      });
    });
  });
  

  it('Adicionar produto ao carrinho', () => {
      // Cenário falhando devido a falha na autorização, mesmo método de autorização utilizado em cenários acima, nada que indique autorização especial no https://serverest.dev/#/Carrinhos/post_carrinhos
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/carrinhos/',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      body: {
        idProduto: 'BeeJh5lz3k6kSIzA',
        quantidade: 1
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message', 'Produto adicionado com sucesso');
    });
  });

  it('Concluir compra', () => {
      // Cenário falhando devido a falha na autorização, mesmo método de autorização utilizado em cenários acima, nada que indique autorização especial no https://serverest.dev/#/Carrinhos/delete_carrinhos_concluir_compra
    cy.request({
      method: 'DELETE',
      url: 'https://serverest.dev/carrinhos/concluir-compra',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'Produto removido com sucesso');
    });
  });

  it('Deletar carrinho', () => {
    // Cenário falhando devido a falha na autorização, mesmo método de autorização utilizado em cenários acima, nada que indique autorização especial no https://serverest.dev/#/Carrinhos/delete_carrinhos_cancelar_compra
    cy.request({
      method: 'DELETE',
      url: 'https://serverest.dev/carrinhos/cancelar-compra',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'Produto removido com sucesso');
    });
  });

});
