Facebook Graph API Wrapper for Page Posts
-----
This is a very simple/minimal wrapper using Facebook Graph API wrapper to get a Facebook page's posts

Example
-----
    var credentials, query, page;

    // Facebook App id and secret
    credentials = {
      appId: '1111111111',
      appSecret: 'a1b2c3d4e5'
    };

    // Instantiate
    page = require('fb-page-wrapper')(credentials);

    // Query object with Facebook page id and query string
    query = {
      pageId: '2222222222',
      query: 'fields=id,created_time,status_type,type&limit=25'
    }

    // GET posts, execute callback with returned data
    page.getPosts(query, function(data){
      console.log(data);
    });
