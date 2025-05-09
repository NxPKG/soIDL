import type { StructFieldTypeNode, StructTypeNode } from '@soidl/node-types';

export function structTypeNode<const TFields extends StructFieldTypeNode[] = StructFieldTypeNode[]>(
    fields: TFields,
): StructTypeNode<TFields> {
    return Object.freeze({
        kind: 'structTypeNode',

        // Children.
        fields,
    });
}
