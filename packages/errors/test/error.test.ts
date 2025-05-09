import { expect, test } from 'vitest';

import {
    SOIDL_ERROR__UNEXPECTED_NODE_KIND,
    SOIDL_ERROR__UNRECOGNIZED_NODE_KIND,
    SoidlError,
    isSoidlError,
} from '../src';

test('it exposes the Soidl error context', () => {
    const error = new SoidlError(SOIDL_ERROR__UNRECOGNIZED_NODE_KIND, { kind: 'missingNode' });
    expect(error.context.kind).toBe('missingNode');
});

test('it exposes the Soidl error code', () => {
    const error = new SoidlError(SOIDL_ERROR__UNRECOGNIZED_NODE_KIND, { kind: 'missingNode' });
    expect(error.context.__code).toBe(SOIDL_ERROR__UNRECOGNIZED_NODE_KIND);
});

test('it calls the message formatter with the code and context', () => {
    const error = new SoidlError(SOIDL_ERROR__UNRECOGNIZED_NODE_KIND, { kind: 'missingNode' });
    expect(error.message).toBe('Unrecognized node kind [missingNode].');
});

test('it exposes no cause when none is provided', () => {
    const error = new SoidlError(SOIDL_ERROR__UNRECOGNIZED_NODE_KIND, { kind: 'missingNode' });
    expect(error.cause).toBeUndefined();
});

test('it exposes the cause when provided', () => {
    const cause = {} as unknown;
    const error = new SoidlError(SOIDL_ERROR__UNRECOGNIZED_NODE_KIND, { cause, kind: 'missingNode' });
    expect(error.cause).toBe(cause);
});

test('it returns `true` for an instance of `SoidlError`', () => {
    const error = new SoidlError(SOIDL_ERROR__UNRECOGNIZED_NODE_KIND, { kind: 'missingNode' });
    expect(isSoidlError(error)).toBe(true);
});

test('it returns `false` for an instance of `Error`', () => {
    expect(isSoidlError(new Error('bad thing'))).toBe(false);
});

test('it returns `true` when the error code matches', () => {
    const error = new SoidlError(SOIDL_ERROR__UNRECOGNIZED_NODE_KIND, { kind: 'missingNode' });
    expect(isSoidlError(error, SOIDL_ERROR__UNRECOGNIZED_NODE_KIND)).toBe(true);
});

test('it returns `false` when the error code does not match', () => {
    const error = new SoidlError(SOIDL_ERROR__UNRECOGNIZED_NODE_KIND, { kind: 'missingNode' });
    expect(isSoidlError(error, SOIDL_ERROR__UNEXPECTED_NODE_KIND)).toBe(false);
});
