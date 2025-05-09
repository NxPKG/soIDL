/**
 * This code was AUTOGENERATED using the soidl library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun soidl to update it.
 *
 * @see https://github.com/soidl-idl/soidl
 */

import {
  Serializer,
  scalarEnum,
  u32,
} from '@metaplex-foundation/umi/serializers';

export enum NonceState {
  Uninitialized,
  Initialized,
}

export type NonceStateArgs = NonceState;

export function getNonceStateSerializer(): Serializer<
  NonceStateArgs,
  NonceState
> {
  return scalarEnum<NonceState>(NonceState, {
    size: u32(),
    description: 'NonceState',
  }) as Serializer<NonceStateArgs, NonceState>;
}
