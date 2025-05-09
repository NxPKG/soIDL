import { accountNode, assertIsNode, programNode } from '@soidl/nodes';
import { extendVisitor, nonNullableIdentityVisitor, pipe } from '@soidl/visitors-core';

export function transformDefinedTypesIntoAccountsVisitor(definedTypes: string[]) {
    return pipe(nonNullableIdentityVisitor({ keys: ['rootNode', 'programNode'] }), v =>
        extendVisitor(v, {
            visitProgram(program) {
                const typesToExtract = program.definedTypes.filter(node => definedTypes.includes(node.name));

                const newDefinedTypes = program.definedTypes.filter(node => !definedTypes.includes(node.name));

                const newAccounts = typesToExtract.map(node => {
                    assertIsNode(node.type, 'structTypeNode');
                    return accountNode({
                        ...node,
                        data: node.type,
                        discriminators: [],
                        size: undefined,
                    });
                });

                return programNode({
                    ...program,
                    accounts: [...program.accounts, ...newAccounts],
                    definedTypes: newDefinedTypes,
                });
            },
        }),
    );
}
