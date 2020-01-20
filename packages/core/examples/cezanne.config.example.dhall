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
