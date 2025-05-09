import type { SetValueNode, ValueNode } from '@soidl/node-types';

export function setValueNode<const TItems extends ValueNode[]>(items: TItems): SetValueNode<TItems> {
    return Object.freeze({
        kind: 'setValueNode',

        // Children.
        items,
    });
}
