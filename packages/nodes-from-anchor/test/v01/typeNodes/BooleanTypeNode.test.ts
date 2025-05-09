import { booleanTypeNode } from '@soidl/nodes';
import { expect, test } from 'vitest';

import { typeNodeFromAnchorV01 } from '../../../src';

test('it creates boolean type nodes', () => {
    expect(typeNodeFromAnchorV01('bool')).toEqual(booleanTypeNode());
});
