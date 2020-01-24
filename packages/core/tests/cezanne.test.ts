import * as cezanne from "../src/main";

test("Testing 'generateFunctionName' function", () => {
  expect(cezanne.generateFunctionName("articles", "instagram")).toBe("generateArticlesInstagram");
  expect(cezanne.generateFunctionName("topics", "openGraph")).toBe("generateTopicsOpenGraph");
});
