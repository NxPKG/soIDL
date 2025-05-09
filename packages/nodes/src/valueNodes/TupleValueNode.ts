import type { TupleValueNode, ValueNode } from '@soidl/node-types';

export function tupleValueNode<const TItems extends ValueNode[]>(items: TItems): TupleValueNode<TItems> {
    return Object.freeze({
        kind: 'tupleValueNode',

        // Children.
        items,
    });
}
