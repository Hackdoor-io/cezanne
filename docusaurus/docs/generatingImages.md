---
id: generatingImages
title: Generating Images
---

<img src="/cezanne/img/misc/generatingImages.png" width="300" style="max-width:90vw;" />

Now that you've set up the `cezanne.config.json` [configuration file](/docs/configuration), you're ready to start using **Cezanne**.

Let's say that you've set up the following endpoints:

```json
{
  "articles": {
    "instagram": "https://example.com/cezanne/articles/instagram/:postId/:slug",
    "linkedin": "https://example.com/cezanne/articles/linkedin/:postId/:slug",
    "opengraph": "https://example.com/cezanne/articles/opengraph/:postId/:slug",
    "twitter": "https://example.com/cezanne/articles/twitter/:postId/:slug"
  }
}
```

You can now call the following functions from **Cezanne**:

```js
import { useGenerator } from "cezanne";

const { generateArticlesInstagram } = useGenerator;

generateArticlesInstagram({ postId: "DK8S25", slug: "my-beautiful-post" })
  .then(image => image.toFileSync("./instagram.png"))
  .catch(error => console.log(error));
```

Hey, hey hey! What's happening here? Where does the `generateArticlesInstagram` come form? \
**Cezanne** automatically generates a function for every endpoint listed in your configuration using the following format:

```
generate[Item][Social]
```

so, given the configuration above, we'll gain access to the following functions:

```text
generateArticlesInstagram
generateArticlesLinkedin
generateArticlesOpengraph
generateArticlesTwitter
```

## Dynamic route parameters

How can you handle the dynamic parameters inside of your route? \
Let's take the following route as an example:

```text
https://example.com/cezanne/articles/instagram/:postId/:slug
```

We have two dynamic parameters: `postId` and `slug`. \
Therefore, we must pass them as parameters inside our dynamically-generated function:

```js
generateArticlesInstagram({ postId: "DK8S25", slug: "my-beautiful-post" });
```

**Cezanne** will call the following URL:

```text
https://example.com/cezanne/articles/instagram/DK8S25/my-beautiful-post
```
