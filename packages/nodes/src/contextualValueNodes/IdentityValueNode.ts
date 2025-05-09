import type { IdentityValueNode } from '@soidl/node-types';

export function identityValueNode(): IdentityValueNode {
    return Object.freeze({ kind: 'identityValueNode' });
}
