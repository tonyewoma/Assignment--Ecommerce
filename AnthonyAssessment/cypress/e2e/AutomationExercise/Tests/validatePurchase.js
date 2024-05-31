/// <reference types="cypress" />
const { HomePage } = require("../PageObjects/HomePage.cy");
const { LoginPage } = require("../PageObjects/LoginPage.cy");
const { ProductsPage } = require("../PageObjects/ProductsPage.cy");
const {
  WomenDressProductsPage,
} = require("../PageObjects/WomenDressProductsPage.cy");

describe("Validate transactions", () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const getProductsPage = new ProductsPage();
  const getWomenDressProductsPage = new WomenDressProductsPage();

  beforeEach(() => {
    cy.setViewportSize("Desktop");
    cy.visit("www.automationexercise.com/");
    homePage.clickCustomerLoginBtn();
    cy.url().should("include", "login");
    cy.fixture("data.json").then((data) => {
      loginPage.userName().type(data.username);
      loginPage.password().type(data.password);
    });
    loginPage.clickLoginBtn();
  });

  context("Validate purchase", () => {
    it("The user should be able to purchase 2 items on the ecommerce store", () => {
      getProductsPage
        .getFeaturesItems()

        .find(".col-sm-4")
        .each(($items) => {
          const itemsArray = [];
          // Iterate over each item
          $items.each((index, item) => {
            const $item = Cypress.$(item);
            const label = $item.find("p").text(); //

            const indexOfFirstSpace = $item.find("p").text().indexOf(" ");

            // Extract the first word
            const firstWord = label.slice(0, indexOfFirstSpace);

            // Extract the remaining words starting from the character after the first space
            const remainingWords = label.slice(indexOfFirstSpace + 1);

            // Find the index of the first occurrence of the first word in the remaining words
            const mainWordIndex = remainingWords.indexOf(firstWord);

            // Extract the main word using the index found
            const mainLabel = remainingWords.slice(mainWordIndex);

            const price = parseFloat($item.find("h2").text().split("Rs.")[1]);

            // Push the label and price into the itemsArray
            itemsArray.push({ mainLabel, price });
          });

          // Sort the itemsArray based on price (low to high)
          itemsArray.sort((a, b) => a.price - b.price);

          // Print the sorted list to the console
          itemsArray.forEach((item) => {
            cy.log(`${item.mainLabel}: Rs. ${item.price}`);
          });
        });
      // Next Task
      getProductsPage.clickGetWomenTab();
      getProductsPage.clickGetTopsOption();
      cy.contains("div", "Fancy Green Top")
        .scrollIntoView()
        .within(() => {
          cy.contains("Add to cart").click();
        });
      cy.get(".modal-body > :nth-child(1)")
        .should("be.visible")
        .and("have.text", "Your product has been added to cart.");
      cy.get(".modal-footer > .btn").click();

      //  Next Element
      cy.contains("div", "Summer White Top")
        .scrollIntoView()
        .within(() => {
          cy.contains("Add to cart").click();
        });
      cy.get(".modal-body > :nth-child(1)")
        .should("be.visible")
        .and("have.text", "Your product has been added to cart.");
      cy.get("u").click();
      cy.get(".col-sm-6 > .btn").click();
      cy.get(".form-control").scrollIntoView().type("Order placed.");
      cy.get(":nth-child(7) > .btn").click();
      cy.fixture("data.json").then((data) => {
        cy.get('[data-qa="name-on-card"]').type("Test Card");
        cy.get('[data-qa="card-number"]').type("410000000000");
        cy.get('[data-qa="cvc"]').type("123");
        cy.get('[data-qa="expiry-month"]').type("01");
        cy.get('[data-qa="expiry-year"]').type("1900");
      });
      cy.get('[data-qa="pay-button"]').click();
      cy.get(".col-sm-9 > p")
        .should("be.visible")
        .and("have.text", "Congratulations! Your order has been confirmed!");
    });
  });
});
