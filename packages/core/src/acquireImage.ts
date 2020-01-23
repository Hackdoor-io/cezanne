import * as puppeteer from "puppeteer";

type acquireImage = (endpoint: string, params: [number, number]) => Promise<string>;

const acquireImage: acquireImage = (endpoint, [width, height]) =>
  new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        args: [
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
          '--no-first-run',
          '--no-sandbox',
          '--no-zygote',
          '--single-process'
        ]
      });

      const page = await browser.newPage();
      await page.goto(endpoint);
      await page.setViewport({ width, height });
      const renderedImage = await page.screenshot();
      await browser.close();
      resolve(renderedImage);

    } catch(err) {
      reject(err);
    }
});

export default acquireImage;
