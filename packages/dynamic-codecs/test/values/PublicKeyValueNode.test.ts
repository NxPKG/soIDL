import { publicKeyValueNode } from '@soidl/nodes';
import { LinkableDictionary, visit } from '@soidl/visitors-core';
import { expect, test } from 'vitest';

import { getValueNodeVisitor } from '../../src';

test('it returns the public key as-is', () => {
    const visitor = getValueNodeVisitor(new LinkableDictionary());
    const result = visit(publicKeyValueNode('B3SqCE8ww4xmoPcfm1gGibZENPkPCVp3jNwkYcg7xS6j'), visitor);
    expect(result).toBe('B3SqCE8ww4xmoPcfm1gGibZENPkPCVp3jNwkYcg7xS6j');
});
