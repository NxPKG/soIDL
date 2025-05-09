import type { BytesTypeNode } from '@soidl/node-types';

export function bytesTypeNode(): BytesTypeNode {
    return Object.freeze({ kind: 'bytesTypeNode' });
}
