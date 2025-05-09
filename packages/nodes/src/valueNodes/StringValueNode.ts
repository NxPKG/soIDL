import type { StringValueNode } from '@soidl/node-types';

export function stringValueNode(string: string): StringValueNode {
    return Object.freeze({
        kind: 'stringValueNode',

        // Data.
        string,
    });
}
