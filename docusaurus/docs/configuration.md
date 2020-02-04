---
id: configuration
title: Configuration
---

Make sure to read the [introduction](/introduction) to **Cezanne**!

<img src="/img/misc/configuration.png" width="500px" style="max-width:90vw;" />

**Cezanne** automatically looks for a file called `cezanne.config.json` in the root of your project (where the `package.json` file is). \
The file must be formatted as follows:

```json
{
  "version": 0.1,
  "debug": true,
  "aws": {
    "access_key": "",
    "access_secret": "",
    "bucket_name": ""
  },
  "endpoints": {
    "articles": {
      "instagram": "",
      "linkedin": "",
      "opengraph": "",
      "twitter": ""
    }
  },
  "viewports": {
    "instagram": [1080, 1080],
    "linkedin": [1920, 1080],
    "opengraph": [1200, 630],
    "twitter": [1012, 506]
  }
}
```

Let's break down all the required keys:

| Key           | Required | Description                                                                         |
| ------------- | -------- | ----------------------------------------------------------------------------------- |
| **Version**   | `true`   | The configuration version. Default is `0.1`                                         |
| **Debug**     | `false`  | Will print debug information to the console. Default is `false`                     |
| **AWS**       | `false`  | AWS credentials. Required to upload the resulting images to **S3**                  |
| **Endpoints** | `true`   | A list of endpoints. Every endpoint will generate a specific function (see forward) |
| **Viewports** | `true`   | The viewport to be set for every social image (`[width, height]`)                   |

## Endpoints in depths

Let's dig deeper into the `endpoints` section:

```json
{
  "endpoints": {
    "articles": {
      "instagram": "https://example.com/cezanne/articles/instagram/:postId/:slug",
      "linkedin": "https://example.com/cezanne/articles/linkedin/:postId/:slug",
      "opengraph": "https://example.com/cezanne/articles/opengraph/:postId/:slug",
      "twitter": "https://example.com/cezanne/articles/twitter/:postId/:slug"
    },
    "tags": {
      "instagram": "https://example.com/cezanne/tags/instagram/:postId/:slug",
      "linkedin": "https://example.com/cezanne/tags/linkedin/:postId/:slug",
      "opengraph": "https://example.com/cezanne/tags/opengraph/:postId/:slug",
      "twitter": "https://example.com/cezanne/tags/twitter/:postId/:slug"
    }
  }
}
```

Let's pretend that you just want to create social/open graph images for your blog posts and tags.\
You'll need then to setup a route for every template that will be rendered and then captured by **Cezanne**. \
As you can see, you'll also need to write down every dynamic parameter of your route (such as post id, post slug and so on).

## Using Dhall

While **[Dhall](https://dhall-lang.org)** is not currently supported (but will be in the future), we strongly encourage you to use it to generate your **Cezanne** configuration file.

```haskell
let makeUrl = \(item : Text) ->
    let remote    = "https://example.com"
    let opengraph = "${remote}/opengraph"
    let instagram = "${remote}/instagram"
    let twitter   = "${remote}/twitter"
    let linkedin  = "${remote}/linkedin"
	in {
        instagram = "${instagram}/${item}/:id"
      , opengraph = "${opengraph}/${item}/:id"
      , twitter   = "${twitter}/${item}/:id"
      , linkedin  = "${linkedin}/${item}/:id"
     }

in {
	   version   = 0.1
	 , debug     = True
	 , endpoints = {
       articles  = makeUrl "articles"
     , topics    = makeUrl "topics"
     , authors   = makeUrl "authors"
     , languages = makeUrl "languages"
   	}
    ,
    viewports = {
        instagram = [1080, 1080]
      , opengraph = [1200, 630]
      , twitter   = [1012, 506]
      , linkedin  = [1920, 1080]
    }
    ,
    aws = {
        access_key    = ""
      , access_secret = ""
      , bucket_name   = ""
      , path          = "/path/example/:item/:id"
    }
   }
```
