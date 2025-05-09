import { SOIDL_ERROR__VISITORS__INVALID_PDA_SEED_VALUES, SoidlError } from '@soidl/errors';
import {
    accountValueNode,
    argumentValueNode,
    assertIsNode,
    getAllInstructionArguments,
    INSTRUCTION_INPUT_VALUE_NODES,
    InstructionInputValueNode,
    InstructionNode,
    isNode,
    isNodeFilter,
    PdaNode,
    PdaSeedValueNode,
    pdaSeedValueNode,
    pdaValueNode,
} from '@soidl/nodes';
import {
    extendVisitor,
    getLastNodeFromPath,
    identityVisitor,
    LinkableDictionary,
    NodePath,
    pipe,
    Visitor,
} from '@soidl/visitors-core';

/**
 * Fills in default values for variable PDA seeds that are not explicitly provided.
 * Namely, public key seeds are filled with an accountValueNode using the seed name
 * and other types of seeds are filled with an argumentValueNode using the seed name.
 *
 * An instruction and linkable dictionary are required to determine which seeds are
 * valids and to find the pdaLinkNode for the seed respectively. Any invalid default
 * seed won't be filled in.
 *
 * Strict mode goes one step further and will throw an error if the final array of
 * pdaSeedValueNodes contains invalid seeds or if there aren't enough variable seeds.
 */
export function fillDefaultPdaSeedValuesVisitor(
    instructionPath: NodePath<InstructionNode>,
    linkables: LinkableDictionary,
    strictMode: boolean = false,
) {
    const instruction = getLastNodeFromPath(instructionPath);
    return pipe(identityVisitor({ keys: INSTRUCTION_INPUT_VALUE_NODES }), v =>
        extendVisitor(v, {
            visitPdaValue(node, { next }) {
                const visitedNode = next(node);
                assertIsNode(visitedNode, 'pdaValueNode');
                const foundPda = isNode(visitedNode.pda, 'pdaNode')
                    ? visitedNode.pda
                    : linkables.get([...instructionPath, visitedNode.pda]);
                if (!foundPda) return visitedNode;
                const seeds = addDefaultSeedValuesFromPdaWhenMissing(instruction, foundPda, visitedNode.seeds);
                if (strictMode && !allSeedsAreValid(instruction, foundPda, seeds)) {
                    throw new SoidlError(SOIDL_ERROR__VISITORS__INVALID_PDA_SEED_VALUES, {
                        instruction,
                        instructionName: instruction.name,
                        pda: foundPda,
                        pdaName: foundPda.name,
                    });
                }
                return pdaValueNode(visitedNode.pda, seeds);
            },
        }),
    ) as Visitor<InstructionInputValueNode, InstructionInputValueNode['kind']>;
}

function addDefaultSeedValuesFromPdaWhenMissing(
    instruction: InstructionNode,
    pda: PdaNode,
    existingSeeds: PdaSeedValueNode[],
): PdaSeedValueNode[] {
    const existingSeedNames = new Set(existingSeeds.map(seed => seed.name));
    const defaultSeeds = getDefaultSeedValuesFromPda(instruction, pda).filter(
        seed => !existingSeedNames.has(seed.name),
    );
    return [...existingSeeds, ...defaultSeeds];
}

function getDefaultSeedValuesFromPda(instruction: InstructionNode, pda: PdaNode): PdaSeedValueNode[] {
    return pda.seeds.flatMap((seed): PdaSeedValueNode[] => {
        if (!isNode(seed, 'variablePdaSeedNode')) return [];

        const hasMatchingAccount = instruction.accounts.some(a => a.name === seed.name);
        if (isNode(seed.type, 'publicKeyTypeNode') && hasMatchingAccount) {
            return [pdaSeedValueNode(seed.name, accountValueNode(seed.name))];
        }

        const hasMatchingArgument = getAllInstructionArguments(instruction).some(a => a.name === seed.name);
        if (hasMatchingArgument) {
            return [pdaSeedValueNode(seed.name, argumentValueNode(seed.name))];
        }

        return [];
    });
}

function allSeedsAreValid(instruction: InstructionNode, foundPda: PdaNode, seeds: PdaSeedValueNode[]) {
    const hasAllVariableSeeds = foundPda.seeds.filter(isNodeFilter('variablePdaSeedNode')).length === seeds.length;
    const allAccountsName = instruction.accounts.map(a => a.name);
    const allArgumentsName = getAllInstructionArguments(instruction).map(a => a.name);
    const validSeeds = seeds.every(seed => {
        if (isNode(seed.value, 'accountValueNode')) {
            return allAccountsName.includes(seed.value.name);
        }
        if (isNode(seed.value, 'argumentValueNode')) {
            return allArgumentsName.includes(seed.value.name);
        }
        return true;
    });

    return hasAllVariableSeeds && validSeeds;
}
