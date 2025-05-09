import type { FixedCountNode } from '@soidl/node-types';

export function fixedCountNode(value: number): FixedCountNode {
    return Object.freeze({
        kind: 'fixedCountNode',

        // Data.
        value,
    });
}
