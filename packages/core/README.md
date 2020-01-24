# Cezanne Core

## Usage

In order to get started with Cezanne, you need a configuration file in the root of your project (where the `package.json` file is located).
We suggest to use Dhall for a better development experience (not required, but recommanded).

```dhall
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

the generated JSON file is:

```json
{
  "aws": {
    "access_key": "",
    "access_secret": "",
    "bucket_name": "",
    "path": "/path/example/:item/:id"
  },
  "endpoints": {
    "articles": {
      "instagram": "https://example.com/instagram/articles/:id",
      "linkedin": "https://example.com/linkedin/articles/:id",
      "opengraph": "https://example.com/opengraph/articles/:id",
      "twitter": "https://example.com/twitter/articles/:id"
    },
    "authors": {
      "instagram": "https://example.com/instagram/authors/:id",
      "linkedin": "https://example.com/linkedin/authors/:id",
      "opengraph": "https://example.com/opengraph/authors/:id",
      "twitter": "https://example.com/twitter/authors/:id"
    },
    "languages": {
      "instagram": "https://example.com/instagram/languages/:id",
      "linkedin": "https://example.com/linkedin/languages/:id",
      "opengraph": "https://example.com/opengraph/languages/:id",
      "twitter": "https://example.com/twitter/languages/:id"
    },
    "topics": {
      "instagram": "https://example.com/instagram/topics/:id",
      "linkedin": "https://example.com/linkedin/topics/:id",
      "opengraph": "https://example.com/opengraph/topics/:id",
      "twitter": "https://example.com/twitter/topics/:id"
    }
  },
  "version": 0.1,
  "viewports": {
    "instagram": [
      1080,
      1080
    ],
    "linkedin": [
      1920,
      1080
    ],
    "opengraph": [
      1200,
      630
    ],
    "twitter": [
      1012,
      506
    ]
  }
}
```

Name the file `cezanne.config.json` and you can start to use Cezanne.

It will generate a dynamic method for every route listed in your `cezanne.config.json` file, following the format:

`generate[Endpoint][Social]`

so that with the given configuration file, you'll have the following methods:

```js
generateArticlesInstagram(...);
generateArticlesLinkedin(...);
generateArticlesOpengraph(...);
```

and so on.
If the specified uri has a dynamic parameter (using the Express.js colon notation), you'll need to pass an object with the parameter values as follows:

```js
import cezanne from "cezanne";

const { generateArticlesInstagram } = cezanne;

// URI: https://example.com/instagram/articles/:id
//                                   dynamic id ^
generateArticlesInstagram({ id: "15" });
```
