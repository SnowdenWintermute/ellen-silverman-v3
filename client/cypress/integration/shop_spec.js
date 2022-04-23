describe("Buy a Painting", () => {
  it("user can purchase painting", () => {
    //first person must login
    cy.visit("/");
    cy.get("[data-test=user-menu]").click();
    cy.findByRole("link", { name: "Login" }).click();
    //click Artworks
    //Click a series
    //Click a painting that is not already sold
    //Click 'add to cart' button
    //Click the cart button
    //Click the checkout button
    //Click submit order
    //Enter credit card information
    //Click pay
  });
});
