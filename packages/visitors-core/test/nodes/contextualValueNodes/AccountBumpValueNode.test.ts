import { accountBumpValueNode } from '@soidl/nodes';
import { test } from 'vitest';

import {
    expectDebugStringVisitor,
    expectDeleteNodesVisitor,
    expectIdentityVisitor,
    expectMergeVisitorCount,
} from '../_setup';

const node = accountBumpValueNode('metadata');

test('mergeVisitor', () => {
    expectMergeVisitorCount(node, 1);
});

test('identityVisitor', () => {
    expectIdentityVisitor(node);
});

test('deleteNodesVisitor', () => {
    expectDeleteNodesVisitor(node, '[accountBumpValueNode]', null);
});

test('debugStringVisitor', () => {
    expectDebugStringVisitor(node, `accountBumpValueNode [metadata]`);
});
