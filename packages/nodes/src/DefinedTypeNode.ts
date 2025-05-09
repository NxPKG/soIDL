import type { DefinedTypeNode, TypeNode } from '@soidl/node-types';

import { camelCase, DocsInput, parseDocs } from './shared';

export type DefinedTypeNodeInput<TType extends TypeNode = TypeNode> = Omit<
    DefinedTypeNode<TType>,
    'docs' | 'kind' | 'name'
> & {
    readonly docs?: DocsInput;
    readonly name: string;
};

export function definedTypeNode<TType extends TypeNode>(input: DefinedTypeNodeInput<TType>): DefinedTypeNode<TType> {
    return Object.freeze({
        kind: 'definedTypeNode',

        // Data.
        name: camelCase(input.name),
        docs: parseDocs(input.docs),

        // Children.
        type: input.type,
    });
}
