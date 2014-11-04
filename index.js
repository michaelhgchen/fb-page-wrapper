/**
 * Simple Facebook Graph API wrapper to get a page's posts
 *
 * Example:
 *
 * var credentials = {
 *   appId: '1111111111',
 *   appSecret: 'a1b2c3d4e5'
 * };
 *
 * var query = {
 *   pageId: '2222222222',
 *   query: 'fields=id,created_time,status_type,type&limit=25'
 * }
 *
 * var page = require('fb-page-wrapper')(credentials);
 *
 * page.getPosts(query, function(data){
 *   console.log(data);
 * });
 */
var
  https       = require('https'),
  querystring = require('querystring'),
  Promise     = require('promise');

function FacebookPage(credentials) {
  this.setAccessToken(credentials);
}

FacebookPage.prototype.setAccessToken = function(credentials) {
  this._accessToken && delete this._accessToken;
  this._accessToken = this.getAccessToken(credentials);
}

FacebookPage.prototype.getAccessToken = function(credentials) {
  if(this._accessToken) return this._accessToken;

  var query, options;

  query = querystring.stringify({
    grant_type:'client_credentials',
    client_id: credentials.appId,
    client_secret: credentials.appSecret
  });

  options = {
    hostname: 'graph.facebook.com',
    path: '/oauth/access_token?' + query
  };

  return new Promise(function(resolve, reject) {
    https.get(options, function(res) {
      var data = '';

      res.on('data', function(chunk){ data += chunk; });
      res.on('error', function(err){ reject(err); });
      res.on('end', function(){ resolve(data); });
    });
  });
}

FacebookPage.prototype.getPosts = function(query, cb) {
  this._accessToken.then(function(accessToken) {
    options = {
      hostname: 'graph.facebook.com',
      path: '/' + query.pageId + '/posts?' + query.query + '&' + accessToken
    }

    https.get(options, function(res) {
      var data = '';

      res.on('data', function(chunk){ data += chunk; });
      res.on('error', function(err) { console.error(err); });
      res.on('end', function() {
        cb(JSON.parse(data));
      });
    });
  });
}

module.exports = function(credentials) {
  return new FacebookPage(credentials);
}