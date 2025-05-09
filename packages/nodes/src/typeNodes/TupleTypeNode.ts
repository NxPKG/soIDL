import type { TupleTypeNode, TypeNode } from '@soidl/node-types';

export function tupleTypeNode<const TItems extends TypeNode[] = TypeNode[]>(items: TItems): TupleTypeNode<TItems> {
    return Object.freeze({
        kind: 'tupleTypeNode',

        // Children.
        items,
    });
}
