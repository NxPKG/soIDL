import { getNodeCodec, ReadonlyUint8Array } from '@soidl/dynamic-codecs';
import { AccountNode, CamelCaseString, GetNodeFromKind, InstructionNode, RootNode } from '@soidl/nodes';
import { getLastNodeFromPath, NodePath } from '@soidl/visitors-core';
import type {
    IAccountLookupMeta,
    IAccountMeta,
    IInstruction,
    IInstructionWithAccounts,
    IInstructionWithData,
} from '@solana/instructions';

import { identifyData } from './identify';

export type ParsedData<TNode extends AccountNode | InstructionNode> = {
    data: unknown;
    path: NodePath<TNode>;
};

export function parseAccountData(
    root: RootNode,
    bytes: ReadonlyUint8Array | Uint8Array,
): ParsedData<AccountNode> | undefined {
    return parseData(root, bytes, 'accountNode');
}

export function parseInstructionData(
    root: RootNode,
    bytes: ReadonlyUint8Array | Uint8Array,
): ParsedData<InstructionNode> | undefined {
    return parseData(root, bytes, 'instructionNode');
}

export function parseData<TKind extends 'accountNode' | 'instructionNode'>(
    root: RootNode,
    bytes: ReadonlyUint8Array | Uint8Array,
    kind?: TKind | TKind[],
): ParsedData<GetNodeFromKind<TKind>> | undefined {
    const path = identifyData<TKind>(root, bytes, kind ?? (['accountNode', 'instructionNode'] as TKind[]));
    if (!path) return undefined;
    const codec = getNodeCodec(path as NodePath<AccountNode | InstructionNode>);
    const data = codec.decode(bytes);
    return { data, path };
}

type ParsedInstructionAccounts = ReadonlyArray<IAccountMeta & { name: CamelCaseString }>;
type ParsedInstruction = ParsedData<InstructionNode> & { accounts: ParsedInstructionAccounts };

export function parseInstruction(
    root: RootNode,
    instruction: IInstruction &
        IInstructionWithAccounts<readonly (IAccountLookupMeta | IAccountMeta)[]> &
        IInstructionWithData<Uint8Array>,
): ParsedInstruction | undefined {
    const parsedData = parseInstructionData(root, instruction.data);
    if (!parsedData) return undefined;
    const instructionNode = getLastNodeFromPath(parsedData.path);
    const accounts: ParsedInstructionAccounts = instructionNode.accounts.flatMap((account, index) => {
        const accountMeta = instruction.accounts[index];
        if (!accountMeta) return [];
        return [{ ...accountMeta, name: account.name }];
    });
    return { ...parsedData, accounts };
}
