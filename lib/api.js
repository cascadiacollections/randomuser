'use strict';

var crypto = require('crypto')
  , Chance = require('chance')
  , may2014 = 1400631205 // no ms
  , years5 = 157680000 // no ms
  , superSeed = new Chance().word({syllables: 3})
  ;

// TODO submit a pull request to allow word seeds in core
function word2int(word) {
  if ('number' === typeof word) {
    return word;
  }

  return String(word).split('').reduce(function (a, b, i) {
    return a + (b.charCodeAt(0) * (i + 1));
  }, 0);
}

function getUser(seed, lego) {
  var chance
    , maturity
    , password
    , salt
    , gender
    , picno
    , portraitType
    ;

  //console.log('seed', seed);
  chance = new Chance(word2int(seed));
  gender = chance.gender().toLowerCase();
  password = chance.word() + chance.integer({ min: 0, max: 99 });
  salt = chance.string({ length: 32 });
  picno = chance.integer({ min: 0, max: 50 });
  maturity = chance.pick(['child', 'teen', 'adult', 'senior']);
  portraitType = ('male' === gender ? 'men/' : 'women/');
  if (lego) {
    portraitType = 'lego/lego_';
  }

  return {
    user: {
      gender: gender,
      name: {
        title: chance.prefix().toLowerCase(),
        first: chance.first().toLowerCase(),
        last: chance.last().toLowerCase()
      },
      location: {
        street: chance.integer({min: 100, max: 9999}) + chance.address().toLowerCase(),
        city: chance.city().toLowerCase(),
        state: chance.state({ full: true }).toLowerCase(),
        zip: chance.zip()
      },
      email: chance.email(),
      username: chance.word() + chance.integer({min: 0, max: 99}),
      password: password,
      // actually do the math...
      salt: salt,
      md5: crypto.createHash('md5').update(salt + password).digest('hex'),
      sha1: crypto.createHash('sha1').update(salt + password).digest('hex'),
      sha256: crypto.createHash('sha256').update(salt + password).digest('hex'),
      registered: may2014 - chance.integer({min: 0, max: years5}),
      dob: Math.round(chance.birthday({ type: maturity }).valueOf() / 1000),
      phone: chance.phone(),
      cell: chance.phone(),
      SSN: chance.natural({ min: 100, max: 999 })
        + '-' + chance.natural({ min: 10, max: 99 })
        + '-' + chance.natural({ min: 1000, max: 9999 })
        ,
      // 0-50 for females, 0-60 for males?
      picture: "http://images.coolaj86.com/api/resize/width/256?url="
        + encodeURIComponent("http://api.randomuser.me/portraits/"
           + portraitType
           + picno  + ".jpg"
          )
    },
    seed: seed,
    version: "0.4"
  };
}

// http://api.randomuser.me/portraits/lego/lego_7.png
// http://api.randomuser.me/?lego&randomapi
// http://api.randomuser.me/?randomapi
// http://www.flickr.com/photos/gregpc/
function getUsers(params) {
  // { seed: "foxie", results: 5, gender: "male" }
  params = params || {};
  if (!params.results) {
    params.results = 1;
  }

  var i
    , result
    , results = []
    , chance
    , actualSeed
    ;

  // TODO fisher-yates-knuth shuffle a dictionary list of 1000 instead
  if (params.seed) {
    actualSeed = params.seed;
    chance = new Chance(word2int(actualSeed));
  } else {
    console.log('superSeed');
    console.log(superSeed);
    actualSeed = superSeed;
    chance = new Chance(word2int(actualSeed));
    superSeed = chance.word({syllables: 3});
  }
  if (params.lego) {
    params.gender = 'male';
  }

  for (i = 0; results.length < params.results; i += 1) {
    console.log('actualSeed');
    console.log(actualSeed);
    result = getUser(actualSeed, params.lego);
    actualSeed = chance.word({syllables: 3});
    console.log(actualSeed);
    if (!params.gender || params.gender === result.user.gender) {
      results.push(result);
    }
  }

  return { results: results };
}

module.exports.getUsers = getUsers;
