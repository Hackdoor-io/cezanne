const cezanne = require("../src/methodGenerator");

test("Testing 'generateFunctionName' function", () => {
  expect(cezanne.generateFunctionName("articles", "instagram")).toBe("generateArticlesInstagram");
  expect(cezanne.generateFunctionName("topics", "linkedin")).toBe("generateTopicsLinkedin");
});

test("Testing 'extractParametersFromUri' function", () => {
  expect(cezanne.extractParametersFromUri("/:id", { id: 10 })).toBe("/10");
  expect(cezanne.extractParametersFromUri("/:id/:title", { id: 10, title: "hello-world" })).toBe(
    "/10/hello-world"
  );
});
