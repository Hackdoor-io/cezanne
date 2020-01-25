const cezanne = require("../src/methodGenerator");

test("Testing 'generateFunctionName' function", () => {
  expect(cezanne.generateFunctionName("articles", "instagram")).toBe("generateArticlesInstagram");
  expect(cezanne.generateFunctionName("topics", "linkedin")).toBe("generateTopicsLinkedin");
});
