/**
 * This code was AUTOGENERATED using the soidl library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun soidl to update it.
 *
 * @see https://github.com/soidl-idl/soidl
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type WritableAccount,
} from '@solana/kit';
import { SYSTEM_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const UPGRADE_NONCE_ACCOUNT_DISCRIMINATOR = 12;

export function getUpgradeNonceAccountDiscriminatorBytes() {
  return getU32Encoder().encode(UPGRADE_NONCE_ACCOUNT_DISCRIMINATOR);
}

export type UpgradeNonceAccountInstruction<
  TProgram extends string = typeof SYSTEM_PROGRAM_ADDRESS,
  TAccountNonceAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountNonceAccount extends string
        ? WritableAccount<TAccountNonceAccount>
        : TAccountNonceAccount,
      ...TRemainingAccounts,
    ]
  >;

export type UpgradeNonceAccountInstructionData = { discriminator: number };

export type UpgradeNonceAccountInstructionDataArgs = {};

export function getUpgradeNonceAccountInstructionDataEncoder(): Encoder<UpgradeNonceAccountInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU32Encoder()]]),
    (value) => ({
      ...value,
      discriminator: UPGRADE_NONCE_ACCOUNT_DISCRIMINATOR,
    })
  );
}

export function getUpgradeNonceAccountInstructionDataDecoder(): Decoder<UpgradeNonceAccountInstructionData> {
  return getStructDecoder([['discriminator', getU32Decoder()]]);
}

export function getUpgradeNonceAccountInstructionDataCodec(): Codec<
  UpgradeNonceAccountInstructionDataArgs,
  UpgradeNonceAccountInstructionData
> {
  return combineCodec(
    getUpgradeNonceAccountInstructionDataEncoder(),
    getUpgradeNonceAccountInstructionDataDecoder()
  );
}

export type UpgradeNonceAccountInput<
  TAccountNonceAccount extends string = string,
> = {
  nonceAccount: Address<TAccountNonceAccount>;
};

export function getUpgradeNonceAccountInstruction<
  TAccountNonceAccount extends string,
  TProgramAddress extends Address = typeof SYSTEM_PROGRAM_ADDRESS,
>(
  input: UpgradeNonceAccountInput<TAccountNonceAccount>,
  config?: { programAddress?: TProgramAddress }
): UpgradeNonceAccountInstruction<TProgramAddress, TAccountNonceAccount> {
  // Program address.
  const programAddress = config?.programAddress ?? SYSTEM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    nonceAccount: { value: input.nonceAccount ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(accounts.nonceAccount)],
    programAddress,
    data: getUpgradeNonceAccountInstructionDataEncoder().encode({}),
  } as UpgradeNonceAccountInstruction<TProgramAddress, TAccountNonceAccount>;

  return instruction;
}

export type ParsedUpgradeNonceAccountInstruction<
  TProgram extends string = typeof SYSTEM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    nonceAccount: TAccountMetas[0];
  };
  data: UpgradeNonceAccountInstructionData;
};

export function parseUpgradeNonceAccountInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedUpgradeNonceAccountInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 1) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      nonceAccount: getNextAccount(),
    },
    data: getUpgradeNonceAccountInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
