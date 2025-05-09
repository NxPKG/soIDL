/**
 * This code was AUTOGENERATED using the soidl library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun soidl to update it.
 *
 * @see https://github.com/soidl-idl/soidl
 */

import {
  type Address,
  type IAccountMeta,
  type IInstruction,
  type IInstructionWithAccounts,
} from '@solana/kit';
import { DUMMY_PROGRAM_ADDRESS } from '../programs';

export type Instruction1Instruction<
  TProgram extends string = typeof DUMMY_PROGRAM_ADDRESS,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> & IInstructionWithAccounts<TRemainingAccounts>;

export type Instruction1Input = {};

export function getInstruction1Instruction<
  TProgramAddress extends Address = typeof DUMMY_PROGRAM_ADDRESS,
>(config?: {
  programAddress?: TProgramAddress;
}): Instruction1Instruction<TProgramAddress> {
  // Program address.
  const programAddress = config?.programAddress ?? DUMMY_PROGRAM_ADDRESS;

  const instruction = {
    programAddress,
  } as Instruction1Instruction<TProgramAddress>;

  return instruction;
}

export type ParsedInstruction1Instruction<
  TProgram extends string = typeof DUMMY_PROGRAM_ADDRESS,
> = {
  programAddress: Address<TProgram>;
};

export function parseInstruction1Instruction<TProgram extends string>(
  instruction: IInstruction<TProgram>
): ParsedInstruction1Instruction<TProgram> {
  return {
    programAddress: instruction.programAddress,
  };
}
