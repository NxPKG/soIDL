import type { RemainderOptionTypeNode, TypeNode } from '@soidl/node-types';

export function remainderOptionTypeNode<TItem extends TypeNode>(item: TItem): RemainderOptionTypeNode<TItem> {
    return Object.freeze({
        kind: 'remainderOptionTypeNode',

        // Children.
        item,
    });
}
