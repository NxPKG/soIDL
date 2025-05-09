import type { FieldDiscriminatorNode } from '@soidl/node-types';

import { camelCase } from '../shared';

export function fieldDiscriminatorNode(name: string, offset: number = 0): FieldDiscriminatorNode {
    return Object.freeze({
        kind: 'fieldDiscriminatorNode',

        // Data.
        name: camelCase(name),
        offset,
    });
}
