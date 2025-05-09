import { publicKeyTypeNode } from '@soidl/nodes';
import { expect, test } from 'vitest';

import { typeNodeFromAnchorV00 } from '../../../src';

test('it creates public key type nodes', () => {
    expect(typeNodeFromAnchorV00('publicKey')).toEqual(publicKeyTypeNode());
});
