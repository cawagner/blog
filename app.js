'use strict';

var express  = require('express');
var app      = express();
var poet     = require('poet')(app);
var moment   = require('moment');

poet.set({
  postsPerPage : 3,
  posts        : './_posts',
  metaFormat   : 'json'
}).createPostRoute( '/myposts/:post', 'post' )
  .createPageRoute( '/pagination/:page', 'page' )
  .createTagRoute( '/mytags/:tag', 'tag' )
  .createCategoryRoute( '/mycategories/:category', 'category' )
  .init();

app.locals.moment = moment;

app.set( 'view engine', 'jade' );
app.set( 'views', __dirname + '/views' );
app.use( express.static( __dirname + '/public' ));
app.use( app.router );

app.get( '/', function ( req, res ) { res.render( 'index' ) });

app.listen( 3000 );