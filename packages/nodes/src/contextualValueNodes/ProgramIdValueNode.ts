import type { ProgramIdValueNode } from '@soidl/node-types';

export function programIdValueNode(): ProgramIdValueNode {
    return Object.freeze({ kind: 'programIdValueNode' });
}
