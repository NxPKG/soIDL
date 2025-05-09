import type { SizeDiscriminatorNode } from '@soidl/node-types';

export function sizeDiscriminatorNode(size: number): SizeDiscriminatorNode {
    return Object.freeze({
        kind: 'sizeDiscriminatorNode',

        // Data.
        size,
    });
}
