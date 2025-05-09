# Soidl ➤ Nodes From Anchor

[![npm][npm-image]][npm-url]
[![npm-downloads][npm-downloads-image]][npm-url]

[npm-downloads-image]: https://img.shields.io/npm/dm/@soidl/nodes-from-anchor.svg?style=flat
[npm-image]: https://img.shields.io/npm/v/@soidl/nodes-from-anchor.svg?style=flat&label=%40soidl%2Fnodes-from-anchor
[npm-url]: https://www.npmjs.com/package/@soidl/nodes-from-anchor

This package converts Anchor IDLs from various versions into Soidl IDLs.

## Installation

```sh
pnpm install @soidl/nodes-from-anchor
```

> [!NOTE]
> This package is **not** included in the main [`soidl`](../library) package.

## Functions

### `rootNodeFromAnchor(anchorIdl)`

This function takes a valid Anchor IDL and returns a `RootNode`.

```js
// node ./soidl.mjs
import { rootNodeFromAnchor } from '@soidl/nodes-from-anchor';
import { createFromRoot } from 'soidl';
import { readFileSync } from 'node:fs';
import path from 'path';

// Read the content of your IDL file.
const anchorIdlPath = path.join(__dirname, 'target', 'idl', 'anchor_program.json');
const anchorIdl = JSON.parse(readFileSync(anchorIdlPath, 'utf-8'));

// Parse it into a Soidl IDL.
const soidl = createFromRoot(rootNodeFromAnchor(anchorIdl));
```
