/**
 * This code was AUTOGENERATED using the soidl library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun soidl to update it.
 *
 * @see https://github.com/soidl-idl/soidl
 */

import {
  Context,
  Pda,
  PublicKey,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u32,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type UpgradeNonceAccountInstructionAccounts = {
  nonceAccount: PublicKey | Pda;
};

// Data.
export type UpgradeNonceAccountInstructionData = { discriminator: number };

export type UpgradeNonceAccountInstructionDataArgs = {};

export function getUpgradeNonceAccountInstructionDataSerializer(): Serializer<
  UpgradeNonceAccountInstructionDataArgs,
  UpgradeNonceAccountInstructionData
> {
  return mapSerializer<
    UpgradeNonceAccountInstructionDataArgs,
    any,
    UpgradeNonceAccountInstructionData
  >(
    struct<UpgradeNonceAccountInstructionData>([['discriminator', u32()]], {
      description: 'UpgradeNonceAccountInstructionData',
    }),
    (value) => ({ ...value, discriminator: 12 })
  ) as Serializer<
    UpgradeNonceAccountInstructionDataArgs,
    UpgradeNonceAccountInstructionData
  >;
}

// Instruction.
export function upgradeNonceAccount(
  context: Pick<Context, 'programs'>,
  input: UpgradeNonceAccountInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'system',
    '11111111111111111111111111111111'
  );

  // Accounts.
  const resolvedAccounts = {
    nonceAccount: {
      index: 0,
      isWritable: true as boolean,
      value: input.nonceAccount ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getUpgradeNonceAccountInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
