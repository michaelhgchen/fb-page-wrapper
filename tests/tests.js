var assert = require('chai').assert;

describe('FacebookPage', function() {
  var credentials, FacebookPage, pageId;

  before(function() {
    // insert a Facebook application's id and secret
    credentials = {
      appId: '',
      appSecret: ''
    };

    // create a FacebookPage instance
    FacebookPage = require('../index')(credentials);

    // Facebook's /Engineering page's id
    pageId = '9445547199';
  });



  describe('getPageId()', function(done) {
    it('should get correct page id', function(done) {
      FacebookPage.getPageId('Engineering', function(id) {
        assert.strictEqual(id, pageId);
        done();
      });
    });
  });



  describe('getPosts() with fields and limit in query', function(done) {
    var fields, limit, query, posts;

    before(function(done) {
      // choose fields
      fields = ['id', 'created_time'];

      // limit to 21 posts
      limit = 21;

      query = {
        pageId: pageId,
        query: 'fields=' + fields.join(',') + '&limit=' + limit
      };

      // query data to test on
      FacebookPage.getPosts(query, function(data){
        posts = data.data;
        done();
      });
    });

    it('should return correct # of posts', function() {
      assert.strictEqual(posts.length, limit);
    });

    it('should have posts with fields specified (if invariant)', function() {
      posts.forEach(function(post) {
        for(var i = 0, j = fields.length; i < j; ++i) {
          assert.isDefined(post[fields[i]]);
        }
      });
    });

    it('should not have fields not specified', function() {
      posts.forEach(function(post) {
        assert.strictEqual(Object.keys(post).length, fields.length);
      });
    });
  });
});

