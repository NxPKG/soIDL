import { bytesTypeNode, numberTypeNode, sizePrefixTypeNode } from '@soidl/nodes';
import { expect, test } from 'vitest';

import { typeNodeFromAnchorV01 } from '../../../src';

test('it creates bytes type nodes', () => {
    expect(typeNodeFromAnchorV01('bytes')).toEqual(sizePrefixTypeNode(bytesTypeNode(), numberTypeNode('u32')));
});
