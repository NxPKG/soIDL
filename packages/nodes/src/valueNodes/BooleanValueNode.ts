import { BooleanValueNode } from '@soidl/node-types';

export function booleanValueNode(boolean: boolean): BooleanValueNode {
    return Object.freeze({
        kind: 'booleanValueNode',

        // Data.
        boolean,
    });
}
