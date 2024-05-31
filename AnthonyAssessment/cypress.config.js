const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome" && browser.isHeadless) {
          launchOptions.args.push("--disable-features=PasswordCheck");
        }

        return launchOptions;
      });
    },
    specPattern: "cypress/e2e/AutomationExercise/allTests.spec.cy.js",
    defaultCommandTimeout: 10000,
    watchForFileChanges: false,
    requestTimeout: 20000,
    pageLoadTimeout: 20000,
  },
});
