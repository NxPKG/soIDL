import type { PayerValueNode } from '@soidl/node-types';

export function payerValueNode(): PayerValueNode {
    return Object.freeze({ kind: 'payerValueNode' });
}
