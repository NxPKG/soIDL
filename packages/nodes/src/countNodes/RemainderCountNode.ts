import type { RemainderCountNode } from '@soidl/node-types';

export function remainderCountNode(): RemainderCountNode {
    return Object.freeze({ kind: 'remainderCountNode' });
}
