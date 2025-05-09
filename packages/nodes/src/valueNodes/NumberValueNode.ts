import type { NumberValueNode } from '@soidl/node-types';

export function numberValueNode(number: number): NumberValueNode {
    return Object.freeze({
        kind: 'numberValueNode',

        // Data.
        number,
    });
}
