'use strict';

var express = require('express');
var mongoose = require('mongoose');
require('dotenv').load();

var Bing = require('node-bing-api')({ accKey: process.env.BING_KEY });

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/fcc-search';
mongoose.connect(mongoURI);

var app = express();

// Bing.images("srsbtx", function(err, res, body) {
//   console.log(err, body);
// });

app.route('/api/imagesearch/:query')
  .get(function(req, res) {
    // parse out search term and offset
    // save search term and time to db
    // search flickrapi and return
      // url
      // snippet
      // thumbnail
      // context
  });

app.route('/api/latest/imagesearch')
  .get(function(req, res) {

  });

app.listen(process.env.PORT || 8080, function(req, res) {
  console.log('listening');
});
