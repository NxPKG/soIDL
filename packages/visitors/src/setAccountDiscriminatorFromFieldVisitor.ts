import { SOIDL_ERROR__VISITORS__ACCOUNT_FIELD_NOT_FOUND, SoidlError } from '@soidl/errors';
import {
    accountNode,
    assertIsNode,
    fieldDiscriminatorNode,
    resolveNestedTypeNode,
    structFieldTypeNode,
    structTypeNode,
    transformNestedTypeNode,
    ValueNode,
} from '@soidl/nodes';
import { BottomUpNodeTransformerWithSelector, bottomUpTransformerVisitor } from '@soidl/visitors-core';

export function setAccountDiscriminatorFromFieldVisitor(
    map: Record<string, { field: string; offset?: number; value: ValueNode }>,
) {
    return bottomUpTransformerVisitor(
        Object.entries(map).map(
            ([selector, { field, value, offset }]): BottomUpNodeTransformerWithSelector => ({
                select: ['[accountNode]', selector],
                transform: node => {
                    assertIsNode(node, 'accountNode');

                    const accountData = resolveNestedTypeNode(node.data);
                    const fieldIndex = accountData.fields.findIndex(f => f.name === field);
                    if (fieldIndex < 0) {
                        throw new SoidlError(SOIDL_ERROR__VISITORS__ACCOUNT_FIELD_NOT_FOUND, {
                            account: node,
                            missingField: field,
                            name: node.name,
                        });
                    }

                    const fieldNode = accountData.fields[fieldIndex];
                    return accountNode({
                        ...node,
                        data: transformNestedTypeNode(node.data, () =>
                            structTypeNode([
                                ...accountData.fields.slice(0, fieldIndex),
                                structFieldTypeNode({
                                    ...fieldNode,
                                    defaultValue: value,
                                    defaultValueStrategy: 'omitted',
                                }),
                                ...accountData.fields.slice(fieldIndex + 1),
                            ]),
                        ),
                        discriminators: [fieldDiscriminatorNode(field, offset), ...(node.discriminators ?? [])],
                    });
                },
            }),
        ),
    );
}
