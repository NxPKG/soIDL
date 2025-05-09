import type { InstructionAccountLinkNode, InstructionLinkNode } from '@soidl/node-types';

import { camelCase } from '../shared';
import { instructionLinkNode } from './InstructionLinkNode';

export function instructionAccountLinkNode(
    name: string,
    instruction?: InstructionLinkNode | string,
): InstructionAccountLinkNode {
    return Object.freeze({
        kind: 'instructionAccountLinkNode',

        // Children.
        ...(instruction === undefined
            ? {}
            : { instruction: typeof instruction === 'string' ? instructionLinkNode(instruction) : instruction }),

        // Data.
        name: camelCase(name),
    });
}
