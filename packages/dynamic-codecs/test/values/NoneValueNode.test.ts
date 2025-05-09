import { noneValueNode } from '@soidl/nodes';
import { LinkableDictionary, visit } from '@soidl/visitors-core';
import { expect, test } from 'vitest';

import { getValueNodeVisitor } from '../../src';

test('it returns a None value object', () => {
    const result = visit(noneValueNode(), getValueNodeVisitor(new LinkableDictionary()));
    expect(result).toStrictEqual({ __option: 'None' });
});
