import type { SoidlVersion } from '@soidl/node-types';
import { expect, expectTypeOf, test } from 'vitest';

import { programNode, rootNode } from '../src';

test('it returns the right node kind', () => {
    const root = rootNode(programNode({ name: 'foo', publicKey: '1111' }));
    expect(root.kind).toBe('rootNode');
});

test('it returns the right Soidl standard', () => {
    const root = rootNode(programNode({ name: 'foo', publicKey: '1111' }));
    expect(root.standard).toBe('soidl');
});

test('it returns the right Soidl version', () => {
    const root = rootNode(programNode({ name: 'foo', publicKey: '1111' }));
    expect(root.version).toBe(__VERSION__);
    expectTypeOf(root.version).toMatchTypeOf<SoidlVersion>();
});

test('it returns a frozen object', () => {
    const root = rootNode(programNode({ name: 'foo', publicKey: '1111' }));
    expect(Object.isFrozen(root)).toBe(true);
});
