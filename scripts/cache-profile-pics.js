'use strict';

var _ = require('lodash')
    // check back at api.randomuser.me and update occasionally
  , types = {
      'men/': [0, 99 + 1, '.jpg']
    , 'women/': [0, 96 + 1, '.jpg']
    , 'lego/lego_': [1, 10 + 1, '.png']
    }
  , images = []
  ;

Object.keys(types).forEach(function (key) {
  _.range(types[key][0], types[key][1]).forEach(function (i) {
    images.push("http://images.coolaj86.com/api/resize/width/256?url="
      + encodeURIComponent("http://api.randomuser.me/portraits/" + key + i + types[key][2]));
  });
});

images.forEach(function (image) {
  console.log('<p><img src="' + image + '"/>');
});
