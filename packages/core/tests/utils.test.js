const utils = require("../src/utils");

test("Testing 'capitalize' method", () => {
  expect(utils.capitalize("text")).toBe("Text");
  expect(utils.capitalize("instagramArticles")).toBe("InstagramArticles");
  expect(utils.capitalize("A")).toBe("A");
  expect(utils.capitalize("b")).toBe("B");
  expect(utils.capitalize(5)).toBe("");
  expect(utils.capitalize(null)).toBe("");
  expect(utils.capitalize(undefined)).toBe("");
});

test("Testing 'extractParametersFromUri' function", () => {
  expect(utils.extractParametersFromUri("/:id", { id: 10 })).toBe("/10");
  expect(utils.extractParametersFromUri("/:id/:title", { id: 10, title: "hello-world" })).toBe(
    "/10/hello-world"
  );
});
