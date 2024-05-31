/// <reference types="cypress" />

const { PageBase } = require("./PageBase.cy");

class HomePage extends PageBase {
  customerLoginBtn() {
    return cy.get(".shop-menu > .nav > :nth-child(4) > a");
  }

  clickCustomerLoginBtn() {
    this.click(this.customerLoginBtn());
  }
}

module.exports = { HomePage };
