import { someValueNode, stringValueNode } from '@soidl/nodes';
import { LinkableDictionary, visit } from '@soidl/visitors-core';
import { expect, test } from 'vitest';

import { getValueNodeVisitor } from '../../src';

test('it wraps the underlying value in a value object', () => {
    const result = visit(someValueNode(stringValueNode('Hello World!')), getValueNodeVisitor(new LinkableDictionary()));
    expect(result).toStrictEqual({ __option: 'Some', value: 'Hello World!' });
});
