import type { ConstantValueNode, SentinelTypeNode, TypeNode } from '@soidl/node-types';

export function sentinelTypeNode<TType extends TypeNode, TSentinel extends ConstantValueNode>(
    type: TType,
    sentinel: TSentinel,
): SentinelTypeNode<TType, TSentinel> {
    return Object.freeze({
        kind: 'sentinelTypeNode',

        // Children.
        type,
        sentinel,
    });
}
