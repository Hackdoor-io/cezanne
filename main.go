package main

import (
  "github.com/chromedp/cdproto/emulation"
  "github.com/chromedp/cdproto/page"
  "github.com/chromedp/chromedp"
  "github.com/joho/godotenv"
  "io/ioutil"
  "log"
  "context"
  "os"
  "regexp"
)

func main() {

  err := godotenv.Load()

  if err != nil {
    log.Fatal("Error loading .env file")
  }

  ctx, cancel := chromedp.NewContext(context.Background())
  defer cancel()

  var buf []byte

  if err := chromedp.Run(ctx, fullScreenshot(getImageUri("10"), 100, &buf)); err != nil {
    log.Fatal(err)
  }

  if err := ioutil.WriteFile("elementScreenshot.png", buf, 0644); err != nil {
    log.Fatal(err)
  }
}

func getImageUri(id string) string {
  baseUrl := os.Getenv("HCK_S3_ARTICLE_ENDPOINT")
  re := regexp.MustCompile(`{id}$`)
  return re.ReplaceAllString(baseUrl, id)
}

func fullScreenshot(urlstr string, quality int64, res *[]byte) chromedp.Tasks {
  return chromedp.Tasks{
    chromedp.Navigate(urlstr),
    chromedp.ActionFunc(func(ctx context.Context) error {

      _, _, contentSize, err := page.GetLayoutMetrics().Do(ctx)
      if err != nil {
        return err
      }

      width, height := int64(1200), int64(630)

      err = emulation.SetDeviceMetricsOverride(width, height, 1, false).
        WithScreenOrientation(&emulation.ScreenOrientation{
          Type:  emulation.OrientationTypePortraitPrimary,
          Angle: 0,
        }).
        Do(ctx)
      if err != nil {
        return err
      }

      *res, err = page.CaptureScreenshot().
        WithQuality(quality).
        WithClip(&page.Viewport{
          X:      contentSize.X,
          Y:      contentSize.Y,
          Width:  1200,
          Height: 630,
          Scale:  1,
        }).Do(ctx)
      if err != nil {
        return err
      }
      return nil
    }),
  }
}
