# Soidl ➤ Validators

[![npm][npm-image]][npm-url]
[![npm-downloads][npm-downloads-image]][npm-url]

[npm-downloads-image]: https://img.shields.io/npm/dm/@soidl/validators.svg?style=flat
[npm-image]: https://img.shields.io/npm/v/@soidl/validators.svg?style=flat&label=%40soidl%2Fvalidators
[npm-url]: https://www.npmjs.com/package/@soidl/validators

This package offers a set of validation rules for Soidl IDLs to ensure that they are correctly formatted.

## Installation

```sh
pnpm install @soidl/validators
```

> [!NOTE]
> This package is included in the main [`soidl`](../library) package. Meaning, you already have access to its content if you are installing Soidl this way.
>
> ```sh
> pnpm install soidl
> ```

## Types

### `ValidationItem`

A validation item describes a single piece of information — typically a warning or an error — about a node in the Soidl IDL.

```ts
type ValidationItem = {
    // The level of importance of a validation item.
    level: 'debug' | 'trace' | 'info' | 'warn' | 'error';
    // A human-readable message describing the issue or information.
    message: string;
    // The node that the validation item is related to.
    node: Node;
    // The path of nodes that led to the node above (including the node itself).
    path: NodePath;
};
```

## Functions

### `getValidationItemsVisitor(visitor)`

The `getValidationItemsVisitor` function returns a visitor that collects all validation items from a Soidl IDL. Note that this visitor is still a work in progress and does not cover all validation rules.

```ts
import { getValidationItemsVisitor } from '@soidl/validators';

const validationItems = soidl.accept(getValidationItemsVisitor());
```

### `throwValidatorItemsVisitor(visitor)`

The `throwValidatorItemsVisitor` function accepts a `Visitor<ValidationItemp[]>` and throws an error if any validation items above a certain level are found. By default, the level is set to `'error'` but a second argument can be passed to change it.

```ts
import { throwValidatorItemsVisitor, getValidationItemsVisitor } from '@soidl/validators';

// Throw if any "error" items are found.
soidl.accept(throwValidatorItemsVisitor(getValidationItemsVisitor()));

// Throw if any "warn" or "error" items are found.
soidl.accept(throwValidatorItemsVisitor(getValidationItemsVisitor(), 'warn'));
```
