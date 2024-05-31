/// <reference types="cypress" />

const { PageBase } = require("./PageBase.cy");

class ProductsPage extends PageBase {
  getFeaturesItems() {
    return cy.get(".features_items");
  }
  getWomenTab() {
    return cy.get(":nth-child(1) > .panel-heading > .panel-title > a");
  }
  getTopsOption() {
    return cy.get("#Women > .panel-body > ul > :nth-child(2) > a");
  }
  clickGetWomenTab() {
    this.click(this.getWomenTab());
  }
  clickGetTopsOption() {
    this.click(this.getTopsOption());
  }
}

module.exports = { ProductsPage };
