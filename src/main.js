'use strict';

var url = require('url');

var express = require('express');
var mongoose = require('mongoose');
require('dotenv').load();

var Bing = require('node-bing-api')({ accKey: process.env.BING_KEY });

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/fcc-search';
mongoose.connect(mongoURI);

var History = require('./history.model.js');

History.find({}).remove().exec(function() {
  History.create({
    array: []
  });
});

var app = express();

// Bing.images("srsbtx", function(err, res, body) {
//   console.log(err, body);
// });

app.route('/api/imagesearch/:query')
  .get(function(req, res) {
    // parse out search term and offset
    var data = url.parse(req.url.substr(req.url.lastIndexOf('/') + 1), true, true);
    var search = decodeURI(data.pathname);
    var offset = data.query.offset;
    // save search term and time to db
    History.findOneAndUpdate(
      {},
      {$push: {array: {
        term: search,
        when: new Date().toISOString()
      }}},
      function(err, model) {
        console.log(err, model);
      }
    );
    // search api and return
    Bing.images(search, {skip: offset || 0}, function(err, bingRes, body) {
      var reducedInfo = body.d.results.map(function(image) {
        return {
          url: image.MediaUrl,
          snippet: image.Title,
          thumbnail: image.Thumbnail.MediaUrl,
          context: image.SourceUrl
        }
      });
      res.json(reducedInfo);
      res.end();
    });
  });

app.route('/api/latest/imagesearch')
  .get(function(req, res) {

  });

app.listen(process.env.PORT || 8080, function(req, res) {
  console.log('listening');
});
