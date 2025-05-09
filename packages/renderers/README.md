# Soidl ➤ Renderers

[![npm][npm-image]][npm-url]
[![npm-downloads][npm-downloads-image]][npm-url]

[npm-downloads-image]: https://img.shields.io/npm/dm/@soidl/renderers.svg?style=flat
[npm-image]: https://img.shields.io/npm/v/@soidl/renderers.svg?style=flat&label=%40soidl%2Frenderers
[npm-url]: https://www.npmjs.com/package/@soidl/renderers

This package re-exports all available renderers for Soidl IDLs.

## Installation

```sh
pnpm install @soidl/renderers
```

> [!NOTE]
> This package is **not** included in the main [`soidl`](../library) package.

## Available renderers

The following renderer packages are included in this package:

- [`@soidl/renderers-js`](../renderers-js) as `renderJavaScriptVisitor`
- [`@soidl/renderers-js-umi`](../renderers-js-umi) as `renderJavaScriptUmiVisitor`
- [`@soidl/renderers-rust`](../renderers-rust) as `renderRustVisitor`

```ts
// node ./soidl.mjs
import { renderJavaScriptVisitor, renderJavaScriptUmiVisitor, renderRustVisitor } from '@soidl/renderers';

soidl.accept(renderJavaScriptVisitor('clients/js/src/generated'));
soidl.accept(renderJavaScriptUmiVisitor('clients/js-umi/src/generated'));
soidl.accept(renderRustVisitor('clients/rust/src/generated'));
```
