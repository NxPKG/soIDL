import { expect, test } from 'vitest';

import { createFromRoot, identityVisitor, programNode, rootNode, rootNodeVisitor, voidVisitor } from '../src';

test('it exports node helpers', () => {
    expect(typeof rootNode).toBe('function');
});

test('it exports visitors', () => {
    expect(typeof identityVisitor).toBe('function');
});

test('it accepts visitors', () => {
    const soidl = createFromRoot(rootNode(programNode({ name: 'myProgram', publicKey: '1111' })));
    const visitor = voidVisitor({ keys: ['rootNode'] });
    const result = soidl.accept(visitor) satisfies void;
    expect(typeof result).toBe('undefined');
});

test('it updates the root node returned by visitors', () => {
    const soidl = createFromRoot(rootNode(programNode({ name: 'myProgram', publicKey: '1111' })));
    const visitor = rootNodeVisitor(node => rootNode(programNode({ ...node.program, name: 'myTransformedProgram' })));
    soidl.update(visitor) satisfies void;
    expect(soidl.getRoot()).toEqual(rootNode(programNode({ name: 'myTransformedProgram', publicKey: '1111' })));
});
