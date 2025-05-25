# randomuser

[![CI](https://github.com/cascadiacollections/randomuser/actions/workflows/node.js.yml/badge.svg)](https://github.com/cascadiacollections/randomuser/actions/workflows/node.js.yml)
[![npm version](https://img.shields.io/npm/v/randomuser.svg?style=flat-square)](https://www.npmjs.com/package/randomuser)

A tiny NodeJS client for generating random users - https://randomuser.me.

## Installation

1. Install dependencies with `yarn`
1. Build the project with `yarn build`
1. Run tests with `yarn test`

## Getting started

### Async/Promise-based API (Recommended)

```typescript
// CommonJS
const RandomUser = require('randomuser');
const client = new RandomUser();

// ES Modules (TypeScript)
import * as RandomUser from 'randomuser';
const client = new RandomUser();

// Async/await with options
async function getRandomUsers() {
  const data = await client.getUsersAsync({ seed: "foxie", results: 5, gender: "male" });
  console.log(data);
}

// Promise-based without options
client.getUsersAsync()
  .then(data => {
    console.log(data);
  });

// With request cancellation
async function getRandomUsersWithTimeout() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
  
  try {
    const data = await client.getUsersAsync(
      { results: 10 },
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);
    console.log(data);
  } catch (error) {
    if (error.code === 'ABORT_ERROR') {
      console.log('Request was cancelled due to timeout');
    } else {
      console.error('Error:', error);
    }
  }
}

// With explicit timeout option
async function getRandomUsersWithTimeoutOption() {
  try {
    const data = await client.getUsersAsync(
      { results: 10 },
      { timeout: 5000 } // 5 second timeout
    );
    console.log(data);
  } catch (error) {
    console.error('Request failed or timed out:', error);
  }
}
```

### Callback API (Deprecated)

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

### Parameters

#### Common Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `results` | `number` or `string` | Number of results to return (default: 1) |
| `gender` | `string` | Filter by gender ("male" or "female") |
| `seed` | `string` | Generate consistent results for the same seed value |
| `page` | `number` or `string` | Page number for pagination |
| `nat` | `string` or `string[]` | Nationality filter (e.g., "us", "gb", "fr") |
| `inc` | `string` or `string[]` | Include only these fields |
| `exc` | `string` or `string[]` | Exclude these fields |

#### Async API Options

| Option | Type | Description |
|--------|------|-------------|
| `signal` | `AbortSignal` | Signal for request cancellation via AbortController |
| `timeout` | `number` | Timeout in milliseconds after which the request will be cancelled |

For full API documentation, see the [RandomUser.me API docs](https://randomuser.me/).

## Contributing

Feel free to contribute!
