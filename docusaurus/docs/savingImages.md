---
id: savingImages
title: Saving Images
sidebar_label: Saving Images
---

<img src="/cezanne/img/misc/savingImages.png" width="350" style="max-width:90vw;" />

## Saving target

**Cezanne** currently supports four methods for saving images (more will be added in the near future). \
Let's pretend we're in the current situation:

```js
import { useGenerator } from "cezanne";

const { generateArticlesInstagram } = useGenerator;

generateArticlesInstagram({ postId: "DK8S25", slug: "my-beautiful-post" });
```

the `generateArticlesInstagram` method returns a promise that allows you to save your file in four different ways:

### buffer

Returns a buffer of the generated image. You can upload it literally everywhere!

- Google Cloud Storage
- AWS S3
- DigitalOcean Spaces

and so on!

```js
const { buffer } = await generateArticlesInstagram({ postId: "DK8S25", slug: "my-beautiful-post" });
```

### toFile

Saves the image to a given path. Returns a `Promise`:

```js
const { toFile } = await generateArticlesInstagram({ postId: "DK8S25", slug: "my-beautiful-post" });

await toFile("./image.png");
```

### toFileSync

Just like the `toFile` method, but syncronously:

```js
const { toFile } = await generateArticlesInstagram({ postId: "DK8S25", slug: "my-beautiful-post" });

toFile("./image.png");
```

### toS3 (experimental)

Uploads your image to S3:

```js
const { toS3 } = await generateArticlesInstagram({ postId: "DK8S25", slug: "my-beautiful-post" });

await toS3("aws/bucket/path/image.png");
```
