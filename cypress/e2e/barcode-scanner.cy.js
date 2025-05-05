describe("Barcode Scanner", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000"); // Update with your actual URL
    });
  
    it("should display the video element", () => {
      cy.get("video").should("exist");
    });
  
    it("should initialize Quagga", () => {
      cy.window().then((win) => {
        cy.stub(win.Quagga, "init").as("initStub");
        cy.stub(win.Quagga, "start").as("startStub");
      });
  
      cy.get("video").should("exist");
      cy.get("@initStub").should("have.been.called");
      cy.get("@startStub").should("have.been.called");
    });
  });
  