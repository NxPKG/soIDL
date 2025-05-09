import { SOIDL_ERROR__NODE_FILESYSTEM_FUNCTION_UNAVAILABLE, SoidlError } from '@soidl/errors';
import { expect, test } from 'vitest';

import { createDirectory, createFile, deleteDirectory, readJson } from '../src';

if (__NODEJS__) {
    test('it reads JSON objects from files', () => {
        const result = readJson('./test/fs.test.json');
        expect(result).toEqual({ key: 'value' });
    });
} else {
    test('it fails to call readJson', () => {
        expect(() => readJson('./path')).toThrow(
            new SoidlError(SOIDL_ERROR__NODE_FILESYSTEM_FUNCTION_UNAVAILABLE, { fsFunction: 'readFileSync' }),
        );
    });
    test('it fails to call createDirectory', () => {
        expect(() => createDirectory('./path')).toThrow(
            new SoidlError(SOIDL_ERROR__NODE_FILESYSTEM_FUNCTION_UNAVAILABLE, { fsFunction: 'mkdirSync' }),
        );
    });
    test('it fails to call deleteDirectory', () => {
        expect(() => deleteDirectory('./path')).toThrow(
            new SoidlError(SOIDL_ERROR__NODE_FILESYSTEM_FUNCTION_UNAVAILABLE, { fsFunction: 'rmSync' }),
        );
    });
    test('it fails to call createFile', () => {
        expect(() => createFile('./path', 'content')).toThrow(
            new SoidlError(SOIDL_ERROR__NODE_FILESYSTEM_FUNCTION_UNAVAILABLE, { fsFunction: 'writeFileSync' }),
        );
    });
}
