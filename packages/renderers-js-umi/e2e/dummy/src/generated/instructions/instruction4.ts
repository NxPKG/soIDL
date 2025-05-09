/**
 * This code was AUTOGENERATED using the soidl library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun soidl to update it.
 *
 * @see https://github.com/soidl-idl/soidl
 */

import {
  Context,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { Serializer, struct, u64 } from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Data.
export type Instruction4InstructionData = { myArgument: bigint };

export type Instruction4InstructionDataArgs = { myArgument: number | bigint };

export function getInstruction4InstructionDataSerializer(): Serializer<
  Instruction4InstructionDataArgs,
  Instruction4InstructionData
> {
  return struct<Instruction4InstructionData>([['myArgument', u64()]], {
    description: 'Instruction4InstructionData',
  }) as Serializer<
    Instruction4InstructionDataArgs,
    Instruction4InstructionData
  >;
}

// Args.
export type Instruction4InstructionArgs = Instruction4InstructionDataArgs;

// Instruction.
export function instruction4(
  context: Pick<Context, 'programs'>,
  input: Instruction4InstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'dummy',
    'Dummy1111111111111111111111111111111111'
  );

  // Accounts.
  const resolvedAccounts = {} satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: Instruction4InstructionArgs = { ...input };

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts as ResolvedAccountsWithIndices
  );

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getInstruction4InstructionDataSerializer().serialize(
    resolvedArgs as Instruction4InstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
