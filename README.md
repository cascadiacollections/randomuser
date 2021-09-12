# randomuser

[![CI](https://github.com/cascadiacollections/randomuser/actions/workflows/node.js.yml/badge.svg)](https://github.com/cascadiacollections/randomuser/actions/workflows/node.js.yml)
[![npm version](https://img.shields.io/npm/v/randomuser.svg?style=flat-square)](https://www.npmjs.com/package/randomuser)

A tiny NodeJS client for generating random users - https://randomuser.me.

## Installation

1. Install dependencies with `yarn`
1. Build the project with `yarn build`
1. Run tests with `yarn test`

## Getting started

```typescript
const RandomUser = require('randomuser');
const client = new RandomUser();

// With options
client.getUsers({ seed: "foxie", results: 5, gender: "male" }, data => {
  console.log(data);
});

// Without options
client.getUsers(data => {
  console.log(data);
});
```

### params {Object} [Documentation](https://randomuser.me/)

* `results` - number specifying number of results to return
* `genders` - string - "male" or "female" specifying gender to generate
* `seed` - string - service will return same data for given seed

## Contributing

Feel free to contribute!
