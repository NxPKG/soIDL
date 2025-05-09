# Soidl ➤ CLI

[![npm][npm-image]][npm-url]
[![npm-downloads][npm-downloads-image]][npm-url]

[npm-downloads-image]: https://img.shields.io/npm/dm/@soidl/cli.svg?style=flat
[npm-image]: https://img.shields.io/npm/v/@soidl/cli.svg?style=flat&label=%40soidl%2Fcli
[npm-url]: https://www.npmjs.com/package/@soidl/cli

This package provides a CLI for the Soidl library that can be used to run scripts on Soidl IDLs.

Note that, whilst the CLI code is located in the `@soidl/cli` package, the CLI binary is directly provided by the main `soidl` library.

## Getting started

To get started with Soidl, simply install `soidl` to your project and run the `init` command like so:

```sh
pnpm install soidl
soidl init
```

You will be prompted for the path of your IDL and asked to select any script presets you would like to use.

## `soidl run`

Once you have your soidl config file, you can run your Soidl scripts using the `soidl run` command as follows:

```sh
soidl run         # Only runs your before visitors.
soidl run js rust # Runs your before visitors followed by the `js` and `rust` scripts.
soidl run --all   # Runs your before visitors followed by all your scripts.
```

## The configuration file

The soidl config file defines an object containing the following fields:

- `idl` (string): The path to the IDL file. This can be a Soidl IDL or an Anchor IDL which will be automatically converted to a Soidl IDL.
- `before` (array): An array of visitors that will run before every script.
- `scripts` (object): An object defining the available Soidl scripts. The keys identify the scripts and the values are arrays of visitors that make up the script.

Whether it is in the `before` array or in the `scripts` values, when defining a visitor you may either provide:

- an object with the following fields:
    - `from` (string): The import path to the visitor.
    - `args` (array): An array of arguments to pass to the visitor.
- a string: The import path to the visitor. This is equivalent to providing an object with a `from` field and an empty `args` array.

Visitor import paths can either be local paths (pointing to JavaScript files exporting visitors) or npm package names. By default, the `default` export will be used but you may specify a named export by appending a `#` followed by the export name. When resolved, the imported element inside the module should either be a `Visitor<any, 'rootNode'>` or a function that returns a `Visitor<any, 'rootNode'>` given the arguments provided. Here are some examples of valid visitor import paths:

```js
'./my-visitor.js'; // Relative local path to a visitor module.
'/Users/me/my-visitor.js'; // Absolute local path to a visitor module.
'some-library'; // npm package name.
'@acme/some-library'; // Scoped npm package name.
'./my-visitor.js#myExport'; // Named export from a local path.
'@acme/some-library#myExport'; // Named export from an npm package.
```

Here is an example of what a Soidl configuration file might look like:

```json
{
    "idl": "path/to/idl",
    "before": [
        "./my-before-visitor.js",
        { "from": "some-library#removeTypes", "args": [["internalFoo", "internalBar"]] }
    ],
    "scripts": {
        "js": [
            {
                "from": "@soidl/renderers-js",
                "args": ["clients/js/src/generated"]
            }
        ]
    }
}
```

Note that you can use the `--js` flag to generate a `.js` configuration file when running the `init` command.
