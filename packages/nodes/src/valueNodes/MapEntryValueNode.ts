import type { MapEntryValueNode, ValueNode } from '@soidl/node-types';

export function mapEntryValueNode<TKey extends ValueNode, TValue extends ValueNode>(
    key: TKey,
    value: TValue,
): MapEntryValueNode<TKey, TValue> {
    return Object.freeze({
        kind: 'mapEntryValueNode',

        // Children.
        key,
        value,
    });
}
