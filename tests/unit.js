var assert = require('chai').assert;

describe('FacebookPage', function() {
  var credentials, page;

  before(function() {
    credentials = {
      appId: '',
      appSecret: ''
    };

    page = require('../index')(credentials);
  });

  describe('getPosts() with fields and limit in query', function(done) {
    var fields, limit, query, posts;

    before(function(done) {
      fields = ['id', 'created_time'];

      limit = 21;

      query = {
        pageId: '9445547199',
        query: 'fields=' + fields.join(',') + '&limit=' + limit
      };

      page.getPosts(query, function(data){
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

