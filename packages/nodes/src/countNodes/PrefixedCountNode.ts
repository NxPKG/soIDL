import type { NestedTypeNode, NumberTypeNode, PrefixedCountNode } from '@soidl/node-types';

export function prefixedCountNode<TPrefix extends NestedTypeNode<NumberTypeNode>>(
    prefix: TPrefix,
): PrefixedCountNode<TPrefix> {
    return Object.freeze({
        kind: 'prefixedCountNode',

        // Children.
        prefix,
    });
}
