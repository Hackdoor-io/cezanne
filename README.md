<img src="/misc/cezanne.png" width="100%" />

This is the monorepo for the **Cezanne** static image generator.

# Packages
- [Cezanne Core](/packages/core)
- Cezanne Lambda (work in progress)
- Cezanne Express (work in progress)

# Cezanne in few words

At [Hackdoor](https://www.hackdoor.io), we needed to build our social and open graph images dinamically. <br />
So we decided to build **Cezanne**.

```js
import cezanne from "cezanne";

async function createInstagramImage() {
    const { generateInstagramArticles } = cezanne;
    const imageBuffer = await generateInstagramArticles({ id: 54 });
}
```

is really that easy? <br />
Yes. And you can learn more reading the [official documentation](cezanne.opensource.hackdoor.io).

# License
![FSF](https://camo.githubusercontent.com/4c95d7815a532e180f995b954d7989a9381ea574/68747470733a2f2f7374617469632e6673662e6f72672f6e6f73766e2f6173736f63696174652f63726d2f333836313831362e706e67)<br />
Licensed under the [GPLv3](/LICENSE.md) license.
