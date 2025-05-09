import type { PublicKeyTypeNode } from '@soidl/node-types';

export function publicKeyTypeNode(): PublicKeyTypeNode {
    return Object.freeze({ kind: 'publicKeyTypeNode' });
}
