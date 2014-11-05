Facebook Graph API Wrapper for Page Posts
==========
This is a very simple/minimal wrapper using Facebook Graph API wrapper to get a Facebook page's posts

Creating an instance
-----
    // Facebook App id and secret
    var credentials = {
      appId: '1111111111', // some app id
      appSecret: 'a1b2c3d4e5' // that app id's secret
    };

    var FacebookPage = require('fb-page-wrapper')(credentials);

Getting a page's id
-----
    // Get id for Facebook page at https://www.facebook.com/Engineering
    FacebookPage.getPageId('Engineering', function(id){
        // do something with id
    });


Getting a page's posts
-----
    // Query object with Facebook page id and query string
    query = {
      pageId: '2222222222', // some page id
      query: 'fields=id,created_time,status_type,type&limit=25'
    }

    // GET posts, execute callback with returned data
    page.getPosts(query, function(data){
      // do something with data
    });
