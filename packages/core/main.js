const { useGenerator } = require("./src/methodGenerator");

const { generateArticlesOpengraph } = useGenerator;

(async () => {
  generateArticlesOpengraph({ id: 49 })
    .then(re => re.toFileSync("./ogImage.png"))
    .catch(e => console.log(e));
})();

module.exports = {
  useGenerator
};
