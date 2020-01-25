const { create } = require("./src/methodGenerator");
const toS3 = require("./src/aws");

const { generateArticlesInstagram } = create;

(async () => {
  const buffer = await generateArticlesInstagram({ id: 25 });
  const res = await toS3(buffer, "testCezanne.png", { item: "ciccio", id: 10 });
})();

module.exports = {
  create,
  toS3
};
