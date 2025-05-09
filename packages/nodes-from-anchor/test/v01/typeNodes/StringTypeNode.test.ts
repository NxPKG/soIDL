import { numberTypeNode, sizePrefixTypeNode, stringTypeNode } from '@soidl/nodes';
import { expect, test } from 'vitest';

import { typeNodeFromAnchorV01 } from '../../../src';

test('it creates string type nodes', () => {
    expect(typeNodeFromAnchorV01('string')).toEqual(sizePrefixTypeNode(stringTypeNode('utf8'), numberTypeNode('u32')));
});
