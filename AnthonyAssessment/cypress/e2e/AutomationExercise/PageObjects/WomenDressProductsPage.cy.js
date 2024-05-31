/// <reference types="cypress" />

const { PageBase } = require("./PageBase.cy");

class WomenDressProductsPage extends PageBase {
  getFeaturesItems() {
    return cy.get(".features_items");
  }
  getWomenTab() {
    return cy.get(":nth-child(1) > .panel-heading > .panel-title > a");
  }
  getTopsOption() {
    return cy.get("#Women > .panel-body > ul > :nth-child(1) > a");
  }
  clickGetWomenTab() {
    this.click(this.getWomenTab());
  }
  clickgetTopsOption() {
    this.click(this.getTopsOption());
  }
  // clickLoginBtn() {
  //   this.click(this.getTopsOption());
  // }
}

module.exports = { WomenDressProductsPage };
