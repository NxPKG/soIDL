/* eslint-disable no-case-declarations */
import { camelCase, InstructionInputValueNode, isNode, OptionalAccountStrategy } from '@soidl/nodes';
import { ResolvedInstructionInput, visit } from '@soidl/visitors-core';

import { GlobalFragmentScope } from '../getRenderMapVisitor';
import { isAsyncDefaultValue } from '../utils';
import { Fragment, fragment, mergeFragments } from './common';

export function getInstructionInputDefaultFragment(
    scope: Pick<GlobalFragmentScope, 'asyncResolvers' | 'getImportFrom' | 'nameApi' | 'typeManifestVisitor'> & {
        input: ResolvedInstructionInput;
        optionalAccountStrategy: OptionalAccountStrategy;
        useAsync: boolean;
    },
): Fragment {
    const { input, optionalAccountStrategy, asyncResolvers, useAsync, nameApi, typeManifestVisitor, getImportFrom } =
        scope;
    if (!input.defaultValue) {
        return fragment('');
    }

    if (!useAsync && isAsyncDefaultValue(input.defaultValue, asyncResolvers)) {
        return fragment('');
    }

    const { defaultValue } = input;
    const defaultFragment = (renderedValue: string, isWritable?: boolean): Fragment => {
        const inputName = camelCase(input.name);
        if (input.kind === 'instructionAccountNode' && isNode(defaultValue, 'resolverValueNode')) {
            return fragment(`accounts.${inputName} = { ...accounts.${inputName}, ...${renderedValue} };`);
        }
        if (input.kind === 'instructionAccountNode' && isWritable === undefined) {
            return fragment(`accounts.${inputName}.value = ${renderedValue};`);
        }
        if (input.kind === 'instructionAccountNode') {
            return fragment(
                `accounts.${inputName}.value = ${renderedValue};\n` +
                    `accounts.${inputName}.isWritable = ${isWritable ? 'true' : 'false'}`,
            );
        }
        return fragment(`args.${inputName} = ${renderedValue};`);
    };

    switch (defaultValue.kind) {
        case 'accountValueNode':
            const name = camelCase(defaultValue.name);
            if (input.kind === 'instructionAccountNode' && input.resolvedIsSigner && !input.isSigner) {
                return defaultFragment(`expectTransactionSigner(accounts.${name}.value).address`).addImports(
                    'shared',
                    'expectTransactionSigner',
                );
            }
            if (input.kind === 'instructionAccountNode') {
                return defaultFragment(`expectSome(accounts.${name}.value)`).addImports('shared', 'expectSome');
            }
            return defaultFragment(`expectAddress(accounts.${name}.value)`).addImports('shared', 'expectAddress');

        case 'pdaValueNode':
            // Inlined PDA value.
            if (isNode(defaultValue.pda, 'pdaNode')) {
                const pdaProgram = defaultValue.pda.programId
                    ? fragment(
                          `'${defaultValue.pda.programId}' as Address<'${defaultValue.pda.programId}'>`,
                      ).addImports('solanaAddresses', 'type Address')
                    : fragment('programAddress');
                const pdaSeeds = defaultValue.pda.seeds.flatMap((seed): Fragment[] => {
                    if (isNode(seed, 'constantPdaSeedNode') && isNode(seed.value, 'programIdValueNode')) {
                        return [
                            fragment(`getAddressEncoder().encode(${pdaProgram.render})`)
                                .mergeImportsWith(pdaProgram)
                                .addImports('solanaAddresses', 'getAddressEncoder'),
                        ];
                    }
                    if (isNode(seed, 'constantPdaSeedNode') && !isNode(seed.value, 'programIdValueNode')) {
                        const typeManifest = visit(seed.type, typeManifestVisitor);
                        const valueManifest = visit(seed.value, typeManifestVisitor);
                        return [
                            fragment(
                                `${typeManifest.encoder.render}.encode(${valueManifest.value.render})`,
                            ).mergeImportsWith(typeManifest.encoder, valueManifest.value),
                        ];
                    }
                    if (isNode(seed, 'variablePdaSeedNode')) {
                        const typeManifest = visit(seed.type, typeManifestVisitor);
                        const valueSeed = defaultValue.seeds.find(s => s.name === seed.name)?.value;
                        if (!valueSeed) return [];
                        if (isNode(valueSeed, 'accountValueNode')) {
                            return [
                                fragment(
                                    `${typeManifest.encoder.render}.encode(expectAddress(accounts.${camelCase(valueSeed.name)}.value))`,
                                )
                                    .mergeImportsWith(typeManifest.encoder)
                                    .addImports('shared', 'expectAddress'),
                            ];
                        }
                        if (isNode(valueSeed, 'argumentValueNode')) {
                            return [
                                fragment(
                                    `${typeManifest.encoder.render}.encode(expectSome(args.${camelCase(valueSeed.name)}))`,
                                )
                                    .mergeImportsWith(typeManifest.encoder)
                                    .addImports('shared', 'expectSome'),
                            ];
                        }
                        const valueManifest = visit(valueSeed, typeManifestVisitor);
                        return [
                            fragment(
                                `${typeManifest.encoder.render}.encode(${valueManifest.value.render})`,
                            ).mergeImportsWith(typeManifest.encoder, valueManifest.value),
                        ];
                    }
                    return [];
                });
                const pdaStatement = mergeFragments([pdaProgram, ...pdaSeeds], ([p, ...s]) => {
                    const programAddress = p === 'programAddress' ? p : `programAddress: ${p}`;
                    return `await getProgramDerivedAddress({ ${programAddress}, seeds: [${s.join(', ')}] })`;
                }).addImports('solanaAddresses', 'getProgramDerivedAddress');
                return defaultFragment(pdaStatement.render).mergeImportsWith(pdaStatement);
            }

            // Linked PDA value.
            const pdaFunction = nameApi.pdaFindFunction(defaultValue.pda.name);
            const pdaArgs = [];
            const pdaSeeds = defaultValue.seeds.map((seed): Fragment => {
                if (isNode(seed.value, 'accountValueNode')) {
                    return fragment(
                        `${seed.name}: expectAddress(accounts.${camelCase(seed.value.name)}.value)`,
                    ).addImports('shared', 'expectAddress');
                }
                if (isNode(seed.value, 'argumentValueNode')) {
                    return fragment(`${seed.name}: expectSome(args.${camelCase(seed.value.name)})`).addImports(
                        'shared',
                        'expectSome',
                    );
                }
                return visit(seed.value, typeManifestVisitor).value.mapRender(r => `${seed.name}: ${r}`);
            });
            const pdaSeedsFragment = mergeFragments(pdaSeeds, renders => renders.join(', ')).mapRender(r => `{ ${r} }`);
            if (pdaSeeds.length > 0) {
                pdaArgs.push(pdaSeedsFragment.render);
            }
            return defaultFragment(`await ${pdaFunction}(${pdaArgs.join(', ')})`)
                .mergeImportsWith(pdaSeedsFragment)
                .addImports(getImportFrom(defaultValue.pda), pdaFunction);

        case 'publicKeyValueNode':
            return defaultFragment(`'${defaultValue.publicKey}' as Address<'${defaultValue.publicKey}'>`).addImports(
                'solanaAddresses',
                'type Address',
            );

        case 'programLinkNode':
            const programAddress = nameApi.programAddressConstant(defaultValue.name);
            return defaultFragment(programAddress, false).addImports(getImportFrom(defaultValue), programAddress);

        case 'programIdValueNode':
            if (
                optionalAccountStrategy === 'programId' &&
                input.kind === 'instructionAccountNode' &&
                input.isOptional
            ) {
                return fragment('');
            }
            return defaultFragment('programAddress', false);

        case 'identityValueNode':
        case 'payerValueNode':
            return fragment('');

        case 'accountBumpValueNode':
            return defaultFragment(
                `expectProgramDerivedAddress(accounts.${camelCase(defaultValue.name)}.value)[1]`,
            ).addImports('shared', 'expectProgramDerivedAddress');

        case 'argumentValueNode':
            return defaultFragment(`expectSome(args.${camelCase(defaultValue.name)})`).addImports(
                'shared',
                'expectSome',
            );

        case 'resolverValueNode':
            const resolverFunction = nameApi.resolverFunction(defaultValue.name);
            const resolverAwait = useAsync && asyncResolvers.includes(defaultValue.name) ? 'await ' : '';
            return defaultFragment(`${resolverAwait}${resolverFunction}(resolverScope)`)
                .addImports(getImportFrom(defaultValue), resolverFunction)
                .addFeatures(['instruction:resolverScopeVariable']);

        case 'conditionalValueNode':
            const ifTrueRenderer = renderNestedInstructionDefault({
                ...scope,
                defaultValue: defaultValue.ifTrue,
            });
            const ifFalseRenderer = renderNestedInstructionDefault({
                ...scope,
                defaultValue: defaultValue.ifFalse,
            });
            if (!ifTrueRenderer && !ifFalseRenderer) {
                return fragment('');
            }
            const conditionalFragment = fragment('');
            if (ifTrueRenderer) {
                conditionalFragment.mergeImportsWith(ifTrueRenderer).mergeFeaturesWith(ifTrueRenderer);
            }
            if (ifFalseRenderer) {
                conditionalFragment.mergeImportsWith(ifFalseRenderer).mergeFeaturesWith(ifFalseRenderer);
            }
            const negatedCondition = !ifTrueRenderer;
            let condition = 'true';

            if (isNode(defaultValue.condition, 'resolverValueNode')) {
                const conditionalResolverFunction = nameApi.resolverFunction(defaultValue.condition.name);
                conditionalFragment
                    .addImports(getImportFrom(defaultValue.condition), conditionalResolverFunction)
                    .addFeatures(['instruction:resolverScopeVariable']);
                const conditionalResolverAwait =
                    useAsync && asyncResolvers.includes(defaultValue.condition.name) ? 'await ' : '';
                condition = `${conditionalResolverAwait}${conditionalResolverFunction}(resolverScope)`;
                condition = negatedCondition ? `!${condition}` : condition;
            } else {
                const comparedInputName = isNode(defaultValue.condition, 'accountValueNode')
                    ? `accounts.${camelCase(defaultValue.condition.name)}.value`
                    : `args.${camelCase(defaultValue.condition.name)}`;
                if (defaultValue.value) {
                    const comparedValue = visit(defaultValue.value, typeManifestVisitor).value;
                    conditionalFragment.mergeImportsWith(comparedValue).mergeFeaturesWith(comparedValue);
                    const operator = negatedCondition ? '!==' : '===';
                    condition = `${comparedInputName} ${operator} ${comparedValue.render}`;
                } else {
                    condition = negatedCondition ? `!${comparedInputName}` : comparedInputName;
                }
            }

            if (ifTrueRenderer && ifFalseRenderer) {
                return conditionalFragment.setRender(
                    `if (${condition}) {\n${ifTrueRenderer.render}\n} else {\n${ifFalseRenderer.render}\n}`,
                );
            }

            return conditionalFragment.setRender(
                `if (${condition}) {\n${ifTrueRenderer ? ifTrueRenderer.render : ifFalseRenderer?.render}\n}`,
            );

        default:
            const valueManifest = visit(defaultValue, typeManifestVisitor).value;
            return defaultFragment(valueManifest.render).mergeImportsWith(valueManifest);
    }
}

function renderNestedInstructionDefault(
    scope: Parameters<typeof getInstructionInputDefaultFragment>[0] & {
        defaultValue: InstructionInputValueNode | undefined;
    },
): Fragment | undefined {
    const { input, defaultValue } = scope;
    if (!defaultValue) return undefined;
    return getInstructionInputDefaultFragment({
        ...scope,
        input: { ...input, defaultValue },
    });
}
