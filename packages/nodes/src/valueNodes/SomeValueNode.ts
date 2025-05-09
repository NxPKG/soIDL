import type { SomeValueNode, ValueNode } from '@soidl/node-types';

export function someValueNode<TValue extends ValueNode>(value: TValue): SomeValueNode<TValue> {
    return Object.freeze({
        kind: 'someValueNode',

        // Children.
        value,
    });
}
