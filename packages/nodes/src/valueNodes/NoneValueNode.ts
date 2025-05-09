import type { NoneValueNode } from '@soidl/node-types';

export function noneValueNode(): NoneValueNode {
    return Object.freeze({ kind: 'noneValueNode' });
}
