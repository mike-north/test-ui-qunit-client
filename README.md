# @test-ui/qunit

[![Build Status](https://travis-ci.org/mike-north/test-ui-qunit.svg?branch=master)](https://travis-ci.org/mike-north/test-ui-qunit)
[![Version](https://img.shields.io/npm/v/@test-ui/qunit.svg)](https://www.npmjs.com/package/@test-ui/qunit)

[Test-UI](https://github.com/mike-north/test-ui-core) support for QUnit. 

## Setup

```sh
npm install @test-ui/qunit
```

## Use

### Client-Side
```ts
import { IFrameConnectionClient  from '@test-ui/core';
import { QUnitTestClient } from '@test-ui/qunit';

// Set the client up
const client = new QUnitTestClient({
  // Make sure to disable the client when it running in a test environment
  enabled: config.environment === 'development',
  connection: new IFrameConnectionClient({
    baseUrl: '/tests',
    frame: myIframe // a HTMLIFrameElement
  })
});

// Run some tests
client.runModules({ name: /purple/ });
```

### Server-Side
```ts
import { IFrameConnectionServer } from '@test-ui/core';
import { QunitTestServer } from '@test-ui/qunit';
import QUnit from 'qunit';

// Set the server up
let srv = new QunitTestServer(QUnit, {
  connection: new IFrameConnectionServer()
});

// Start it
srv.start();
```

## Legal
(c) 2018 LinkedIn