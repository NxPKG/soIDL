/**
 * This code was AUTOGENERATED using the soidl library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun soidl to update it.
 *
 * @see https://github.com/soidl-idl/soidl
 */

import {
  containsBytes,
  getU32Encoder,
  type Address,
  type ReadonlyUint8Array,
} from '@solana/kit';
import {
  type ParsedAdvanceNonceAccountInstruction,
  type ParsedAllocateInstruction,
  type ParsedAllocateWithSeedInstruction,
  type ParsedAssignInstruction,
  type ParsedAssignWithSeedInstruction,
  type ParsedAuthorizeNonceAccountInstruction,
  type ParsedCreateAccountInstruction,
  type ParsedCreateAccountWithSeedInstruction,
  type ParsedInitializeNonceAccountInstruction,
  type ParsedTransferSolInstruction,
  type ParsedTransferSolWithSeedInstruction,
  type ParsedUpgradeNonceAccountInstruction,
  type ParsedWithdrawNonceAccountInstruction,
} from '../instructions';

export const SYSTEM_PROGRAM_ADDRESS =
  '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;

export enum SystemAccount {
  Nonce,
}

export enum SystemInstruction {
  CreateAccount,
  Assign,
  TransferSol,
  CreateAccountWithSeed,
  AdvanceNonceAccount,
  WithdrawNonceAccount,
  InitializeNonceAccount,
  AuthorizeNonceAccount,
  Allocate,
  AllocateWithSeed,
  AssignWithSeed,
  TransferSolWithSeed,
  UpgradeNonceAccount,
}

export function identifySystemInstruction(
  instruction: { data: ReadonlyUint8Array } | ReadonlyUint8Array
): SystemInstruction {
  const data = 'data' in instruction ? instruction.data : instruction;
  if (containsBytes(data, getU32Encoder().encode(0), 0)) {
    return SystemInstruction.CreateAccount;
  }
  if (containsBytes(data, getU32Encoder().encode(1), 0)) {
    return SystemInstruction.Assign;
  }
  if (containsBytes(data, getU32Encoder().encode(2), 0)) {
    return SystemInstruction.TransferSol;
  }
  if (containsBytes(data, getU32Encoder().encode(3), 0)) {
    return SystemInstruction.CreateAccountWithSeed;
  }
  if (containsBytes(data, getU32Encoder().encode(4), 0)) {
    return SystemInstruction.AdvanceNonceAccount;
  }
  if (containsBytes(data, getU32Encoder().encode(5), 0)) {
    return SystemInstruction.WithdrawNonceAccount;
  }
  if (containsBytes(data, getU32Encoder().encode(6), 0)) {
    return SystemInstruction.InitializeNonceAccount;
  }
  if (containsBytes(data, getU32Encoder().encode(7), 0)) {
    return SystemInstruction.AuthorizeNonceAccount;
  }
  if (containsBytes(data, getU32Encoder().encode(8), 0)) {
    return SystemInstruction.Allocate;
  }
  if (containsBytes(data, getU32Encoder().encode(9), 0)) {
    return SystemInstruction.AllocateWithSeed;
  }
  if (containsBytes(data, getU32Encoder().encode(10), 0)) {
    return SystemInstruction.AssignWithSeed;
  }
  if (containsBytes(data, getU32Encoder().encode(11), 0)) {
    return SystemInstruction.TransferSolWithSeed;
  }
  if (containsBytes(data, getU32Encoder().encode(12), 0)) {
    return SystemInstruction.UpgradeNonceAccount;
  }
  throw new Error(
    'The provided instruction could not be identified as a system instruction.'
  );
}

export type ParsedSystemInstruction<
  TProgram extends string = '11111111111111111111111111111111',
> =
  | ({
      instructionType: SystemInstruction.CreateAccount;
    } & ParsedCreateAccountInstruction<TProgram>)
  | ({
      instructionType: SystemInstruction.Assign;
    } & ParsedAssignInstruction<TProgram>)
  | ({
      instructionType: SystemInstruction.TransferSol;
    } & ParsedTransferSolInstruction<TProgram>)
  | ({
      instructionType: SystemInstruction.CreateAccountWithSeed;
    } & ParsedCreateAccountWithSeedInstruction<TProgram>)
  | ({
      instructionType: SystemInstruction.AdvanceNonceAccount;
    } & ParsedAdvanceNonceAccountInstruction<TProgram>)
  | ({
      instructionType: SystemInstruction.WithdrawNonceAccount;
    } & ParsedWithdrawNonceAccountInstruction<TProgram>)
  | ({
      instructionType: SystemInstruction.InitializeNonceAccount;
    } & ParsedInitializeNonceAccountInstruction<TProgram>)
  | ({
      instructionType: SystemInstruction.AuthorizeNonceAccount;
    } & ParsedAuthorizeNonceAccountInstruction<TProgram>)
  | ({
      instructionType: SystemInstruction.Allocate;
    } & ParsedAllocateInstruction<TProgram>)
  | ({
      instructionType: SystemInstruction.AllocateWithSeed;
    } & ParsedAllocateWithSeedInstruction<TProgram>)
  | ({
      instructionType: SystemInstruction.AssignWithSeed;
    } & ParsedAssignWithSeedInstruction<TProgram>)
  | ({
      instructionType: SystemInstruction.TransferSolWithSeed;
    } & ParsedTransferSolWithSeedInstruction<TProgram>)
  | ({
      instructionType: SystemInstruction.UpgradeNonceAccount;
    } & ParsedUpgradeNonceAccountInstruction<TProgram>);
