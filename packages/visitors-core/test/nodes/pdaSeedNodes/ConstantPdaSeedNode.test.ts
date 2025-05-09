import { constantPdaSeedNode, numberTypeNode, numberValueNode } from '@soidl/nodes';
import { test } from 'vitest';

import {
    expectDebugStringVisitor,
    expectDeleteNodesVisitor,
    expectIdentityVisitor,
    expectMergeVisitorCount,
} from '../_setup';

const node = constantPdaSeedNode(numberTypeNode('u8'), numberValueNode(42));

test('mergeVisitor', () => {
    expectMergeVisitorCount(node, 3);
});

test('identityVisitor', () => {
    expectIdentityVisitor(node);
});

test('deleteNodesVisitor', () => {
    expectDeleteNodesVisitor(node, '[constantPdaSeedNode]', null);
    expectDeleteNodesVisitor(node, '[numberTypeNode]', null);
    expectDeleteNodesVisitor(node, '[numberValueNode]', null);
});

test('debugStringVisitor', () => {
    expectDebugStringVisitor(
        node,
        `
constantPdaSeedNode
|   numberTypeNode [u8]
|   numberValueNode [42]`,
    );
});
