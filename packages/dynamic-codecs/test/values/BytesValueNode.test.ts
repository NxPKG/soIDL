import { bytesValueNode } from '@soidl/nodes';
import { LinkableDictionary, visit } from '@soidl/visitors-core';
import { expect, test } from 'vitest';

import { getValueNodeVisitor } from '../../src';

test('it returns a tuple with encoding and encoded data', () => {
    const node = bytesValueNode('base58', 'heLLo');
    const result = visit(node, getValueNodeVisitor(new LinkableDictionary()));
    expect(result).toStrictEqual(['base58', 'heLLo']);
});
