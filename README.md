# randomuser

[![CI](https://github.com/cascadiacollections/randomuser/actions/workflows/node.js.yml/badge.svg)](https://github.com/cascadiacollections/randomuser/actions/workflows/node.js.yml)
[![npm version](https://img.shields.io/npm/v/randomuser.svg?style=flat-square)](https://www.npmjs.com/package/randomuser)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A tiny NodeJS client for generating random users using the [RandomUser.me](https://randomuser.me) API. Perfect for testing, prototyping, and generating placeholder user data for your applications.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Getting Started](#getting-started)
  - [Async/Promise-based API (Recommended)](#asyncpromise-based-api-recommended)
  - [Callback API (Deprecated)](#callback-api-deprecated)
  - [Parameters](#parameters)
- [Contributing](#contributing)

## Installation

```bash
npm install randomuser
```

or with yarn:

```bash
yarn add randomuser
```

## Quick Start

```javascript
const RandomUser = require('randomuser');
const client = new RandomUser();

// Get a single random user
client.getUsersAsync().then(data => {
  console.log(data[0]); // User object with name, email, address, etc.
});

// Get multiple users with options
client.getUsersAsync({ results: 3, gender: 'female' }).then(data => {
  console.log(data); // Array of 3 female user objects
});
```

### Example Output

```javascript
{
  gender: 'female',
  name: { title: 'Ms', first: 'Jennie', last: 'Nichols' },
  location: {
    street: '8929 Valwood Pkwy',
    city: 'Billings',
    state: 'Michigan',
    postcode: '63104',
    coordinates: { latitude: '-69.8246', longitude: '134.8719' },
    timezone: { offset: '+9:30', description: 'Adelaide, Darwin' }
  },
  email: 'jennie.nichols@example.com',
  phone: '(272) 790-0888',
  cell: '(489) 330-2385',
  id: { name: 'SSN', value: '405-88-3636' },
  picture: {
    large: 'https://randomuser.me/api/portraits/women/75.jpg',
    medium: 'https://randomuser.me/api/portraits/med/women/75.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/women/75.jpg'
  },
  nat: 'US'
}
```

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

We welcome contributions! Here's how you can help:

1. **Fork the repository** and create your feature branch
2. **Install dependencies**: `yarn install`
3. **Build the project**: `yarn build`
4. **Run tests**: `yarn test`
5. **Make your changes** and ensure tests pass
6. **Submit a pull request** with a clear description of your changes

### Development Setup

1. Clone your fork: `git clone https://github.com/your-username/randomuser.git`
2. Install dependencies: `yarn install`
3. Build the project: `yarn build`
4. Run tests: `yarn test`

Please make sure your code follows the existing style and includes appropriate tests.
