describe('Testes no SauceDemo', () => {
  const url = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  beforeEach(() => {
      cy.visit(url); // Acessa o site antes de cada teste
  });

  it('Deve fazer login com sucesso', () => {
      cy.get('[data-test="username"]').type(username);
      cy.get('[data-test="password"]').type(password);
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory.html'); // Verifica se foi redirecionado
  });

  it('Deve falhar ao tentar login com credenciais erradas', () => {
      cy.get('[data-test="username"]').type('wrong_user');
      cy.get('[data-test="password"]').type('wrong_password');
      cy.get('[data-test="login-button"]').click();
      cy.get('[data-test="error"]').should('be.visible'); // Verifica mensagem de erro
  });

  it('Deve adicionar um item ao carrinho', () => {
      cy.get('[data-test="username"]').type(username);
      cy.get('[data-test="password"]').type(password);
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_badge').should('contain', '1'); // Verifica se o carrinho tem 1 item
  });

  it('Deve remover um item do carrinho', () => {
      cy.get('[data-test="username"]').type(username);
      cy.get('[data-test="password"]').type(password);
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="remove-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_badge').should('not.exist'); // Carrinho deve estar vazio
  });

  it('Deve finalizar uma compra', () => {
      cy.get('[data-test="username"]').type(username);
      cy.get('[data-test="password"]').type(password);
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();

      cy.get('[data-test="firstName"]').type('Test');
      cy.get('[data-test="lastName"]').type('User');
      cy.get('[data-test="postalCode"]').type('12345');
      cy.get('[data-test="continue"]').click();

      cy.get('[data-test="finish"]').click();
      cy.get('.complete-header').should('contain', 'Thank you for your order!'); // Confirmação de compra
  });
});