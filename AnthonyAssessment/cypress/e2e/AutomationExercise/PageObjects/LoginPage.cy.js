/// <reference types="cypress" />

const { PageBase } = require("./PageBase.cy");

class LoginPage extends PageBase {
  userName() {
    return cy.get('[data-qa="login-email"]');
  }
  password() {
    return cy.get('[data-qa="login-password"]');
  }
  loginBtn() {
    return cy.get('[data-qa="login-button"]');
  }
  clickLoginBtn() {
    this.click(this.loginBtn());
  }
}

module.exports = { LoginPage };
