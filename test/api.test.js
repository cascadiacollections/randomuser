'use strict';

var api = require('../lib/api')
  ;

// TODO write real tests
function test() {
  //console.log(JSON.stringify(api.getUsers(), null, '  '));
  //console.log(JSON.stringify(api.getUsers({ gender: 'male' }), null, '  '));
  console.log(JSON.stringify(api.getUsers({ gender: 'male', seed: 'rfluffypoo' }), null, '  '));
  //console.log(JSON.stringify(api.getUsers({ gender: 'male', seed: 'rfluffypoo', results: 3 }), null, '  '));
  //console.log(JSON.stringify(api.getUsers({ seed: 'nepircu', results: 1 }), null, '  '));
  //console.log(JSON.stringify(api.getUsers({ results: 3 }), null, '  '));
}

test();

// should get something in this format back
/*
{
    results: [
      {
        user: {
          gender: "male",
          name: {
            title: "mr",
            first: "patrick",
            last: "coleman"
          },
          location: {
            street: "4046 hickory creek dr",
            city: "stockton",
            state: "minnesota",
            zip: "10532"
          },
          email: "patrick.coleman45@example.com",
          username: "ticklishostrich48",
          password: "darkknight55",
          salt: ">DyBf9aih",
          md5: "5d6bf4508070fba41e2d602c847cdbd9",
          sha1: "19e5b0b59e6c86dbf370c431a7edb2aa4f1420a6",
          sha256: "9434e04d307839d9b6411254007072412c11f7e6b5d8fd848e56fe5f0c660a04",
          registered: "1144410814",
          dob: "122791739",
          phone: "(510)-200-1728",
          cell: "(201)-442-6033",
          SSN: "525-20-3862",
          picture: "http://api.randomuser.me/portraits/men/9.jpg"
        },
        seed: "graywolf",
        version: "0.4"
      }
    ]
  }
 */
