import { booleanValueNode } from '@soidl/nodes';
import { test } from 'vitest';

import {
    expectDebugStringVisitor,
    expectDeleteNodesVisitor,
    expectIdentityVisitor,
    expectMergeVisitorCount,
} from '../_setup';

const node = booleanValueNode(true);

test('mergeVisitor', () => {
    expectMergeVisitorCount(node, 1);
});

test('identityVisitor', () => {
    expectIdentityVisitor(node);
});

test('deleteNodesVisitor', () => {
    expectDeleteNodesVisitor(node, '[booleanValueNode]', null);
});

test('debugStringVisitor', () => {
    expectDebugStringVisitor(node, `booleanValueNode [true]`);
});
