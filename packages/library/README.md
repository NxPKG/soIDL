# Soidl ➤ Main Library

[![npm][npm-image]][npm-url]
[![npm-downloads][npm-downloads-image]][npm-url]

[npm-downloads-image]: https://img.shields.io/npm/dm/soidl.svg?style=flat
[npm-image]: https://img.shields.io/npm/v/soidl.svg?style=flat&label=%40soidl%2Fnodes
[npm-url]: https://www.npmjs.com/package/soidl

This package is the main library for Soidl. It re-exports most of the other packages in the Soidl monorepo and offers a `Soidl` type with a few helpers to help bind everything together.

## Installation

```sh
pnpm install soidl
```

## Packages included

This package includes the following packages. Note that some of them also re-export other packages.

- [`@soidl/errors`](../errors)
- [`@soidl/nodes`](../nodes)
    - [`@soidl/node-types`](../node-types)
- [`@soidl/validators`](../validators)
- [`@soidl/visitors`](../visitors)
    - [`@soidl/visitor-core`](../visitor-core)

## The Soidl helper

Additionally, this package offers a `Soidl` type and a few helper functions to help you work with Soidl IDLs.

### `Soidl`

The `Soidl` interface wraps a `RootNode` and offers some helper methods to work with it.

```ts
export interface Soidl {
    accept<T>(visitor: Visitor<T>): T;
    clone(): Soidl;
    getJson(): string;
    getRoot(): RootNode;
    update(visitor: Visitor<Node | null>): void;
}
```

The `accept` function allows us to visit the wrapped `RootNode` using the provided visitor.

```ts
// Log the Soidl IDL in the console.
soidl.accept(consoleLogVisitor(getDebugStringVisitor({ indent: true })));
```

The `update` function also accepts a visitor, but it uses the return value of that visitor to update the wrapped `RootNode`. This means that, given a `RootNode`, the provided visitor should also return a `RootNode`. An error will be thrown otherwise.

```ts
// Delete account nodes named "mint".
soidl.update(deleteNodesVisitor(['[accountNode]mint']));

// Transform all number nodes into u64 number nodes.
soidl.update(
    bottomUpTransformerVisitor([
        {
            select: '[numberTypeNode]',
            transform: () => numberTypeNode(u64),
        },
    ]),
);
```

Other helper functions include:

- `clone()`: Creates a new instance of the `Soidl` interface with a deep copy of the wrapped `RootNode`.
- `getJson()`: Returns the JSON representation of the Soidl IDL.
- `getRoot()`: Returns the wrapped `RootNode`.

```ts
const clonedSoidl = soidl.clone();
const jsonIdl = soidl.getJson();
const rootNode = soidl.getRoot();
```

### `createFromRoot(rootNode)`

The `createFromRoot` function creates a new instance of the `Soidl` interface from a `RootNode`.

```ts
const soidl = createFromRoot(rootNode(programNode({ ... })));
```

### `createFromJson(jsonIdl)`

The `createFromJson` function creates a new instance of the `Soidl` interface from a JSON representation of a `RootNode`.

```ts
const json: string = fs.readFileSync('path/to/soidlIdl.json', 'utf-8');
const soidl = createFromJson(json);
```
