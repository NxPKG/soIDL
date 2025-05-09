import { SOIDL_ERROR__VISITORS__INSTRUCTION_ENUM_ARGUMENT_NOT_FOUND, SoidlError } from '@soidl/errors';
import {
    assertIsNode,
    camelCase,
    EnumTypeNode,
    instructionArgumentNode,
    InstructionNode,
    instructionNode,
    isNode,
    numberTypeNode,
    numberValueNode,
} from '@soidl/nodes';
import {
    BottomUpNodeTransformerWithSelector,
    bottomUpTransformerVisitor,
    LinkableDictionary,
    pipe,
    recordLinkablesOnFirstVisitVisitor,
} from '@soidl/visitors-core';

import { flattenInstructionArguments } from './flattenInstructionDataArgumentsVisitor';

export function createSubInstructionsFromEnumArgsVisitor(map: Record<string, string>) {
    const linkables = new LinkableDictionary();

    const visitor = bottomUpTransformerVisitor(
        Object.entries(map).map(
            ([selector, argNameInput]): BottomUpNodeTransformerWithSelector => ({
                select: ['[instructionNode]', selector],
                transform: (node, stack) => {
                    assertIsNode(node, 'instructionNode');

                    const argFields = node.arguments;
                    const argName = camelCase(argNameInput);
                    const argFieldIndex = argFields.findIndex(field => field.name === argName);
                    const argField = argFieldIndex >= 0 ? argFields[argFieldIndex] : null;
                    if (!argField) {
                        throw new SoidlError(SOIDL_ERROR__VISITORS__INSTRUCTION_ENUM_ARGUMENT_NOT_FOUND, {
                            argumentName: argName,
                            instruction: node,
                            instructionName: node.name,
                        });
                    }

                    let argType: EnumTypeNode;
                    if (isNode(argField.type, 'enumTypeNode')) {
                        argType = argField.type;
                    } else if (
                        isNode(argField.type, 'definedTypeLinkNode') &&
                        linkables.has([...stack.getPath(), argField.type])
                    ) {
                        const linkedType = linkables.get([...stack.getPath(), argField.type])?.type;
                        assertIsNode(linkedType, 'enumTypeNode');
                        argType = linkedType;
                    } else {
                        throw new SoidlError(SOIDL_ERROR__VISITORS__INSTRUCTION_ENUM_ARGUMENT_NOT_FOUND, {
                            argumentName: argName,
                            instruction: node,
                            instructionName: node.name,
                        });
                    }

                    const subInstructions = argType.variants.map((variant, index): InstructionNode => {
                        const subName = camelCase(`${node.name} ${variant.name}`);
                        const subFields = argFields.slice(0, argFieldIndex);
                        subFields.push(
                            instructionArgumentNode({
                                defaultValue: numberValueNode(index),
                                defaultValueStrategy: 'omitted',
                                name: `${subName}Discriminator`,
                                type: numberTypeNode('u8'),
                            }),
                        );
                        if (isNode(variant, 'enumStructVariantTypeNode')) {
                            subFields.push(
                                instructionArgumentNode({
                                    ...argField,
                                    type: variant.struct,
                                }),
                            );
                        } else if (isNode(variant, 'enumTupleVariantTypeNode')) {
                            subFields.push(
                                instructionArgumentNode({
                                    ...argField,
                                    type: variant.tuple,
                                }),
                            );
                        }
                        subFields.push(...argFields.slice(argFieldIndex + 1));

                        return instructionNode({
                            ...node,
                            arguments: flattenInstructionArguments(subFields),
                            name: subName,
                        });
                    });

                    return instructionNode({
                        ...node,
                        subInstructions: [...(node.subInstructions ?? []), ...subInstructions],
                    });
                },
            }),
        ),
    );

    return pipe(visitor, v => recordLinkablesOnFirstVisitVisitor(v, linkables));
}
