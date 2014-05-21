'use strict';

var RandomUser = require('../lib/')
  , ru = RandomUser.create({ local: true })
  ;

ru.getUsers({ results: 2, seed: 'billyjean', gender: 'female' }, console.log);
