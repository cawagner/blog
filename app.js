'use strict';

var express = require('express');
var moment = require('moment');
var Poet = require('poet');

var app = express();

var poet = Poet(app, {
    postsPerPage: 3,
    posts: __dirname + '/_posts',
    metaFormat: 'json',
    readMoreLink : function ( post ) {
      var anchor = '<a href="'+post.url+'" title="Read more of '+post.title+'">read more</a>';
      return '<p>' + anchor + '</p>';
    }
});

poet.init();

app.locals.moment = moment;

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(app.router);

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/rss', function (req, res) {
  var posts = poet.helpers.getPosts(0, 5);
  res.setHeader('Content-Type', 'application/rss+xml');
  res.render('rss', { posts: posts });
});

app.listen(3000);