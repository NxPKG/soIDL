import { stringValueNode } from '@soidl/nodes';
import { LinkableDictionary, visit } from '@soidl/visitors-core';
import { expect, test } from 'vitest';

import { getValueNodeVisitor } from '../../src';

test('it returns the string as-is', () => {
    const result = visit(stringValueNode('Hello World!'), getValueNodeVisitor(new LinkableDictionary()));
    expect(result).toBe('Hello World!');
});
