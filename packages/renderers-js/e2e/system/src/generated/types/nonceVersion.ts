/**
 * This code was AUTOGENERATED using the soidl library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun soidl to update it.
 *
 * @see https://github.com/soidl-idl/soidl
 */

import {
  combineCodec,
  getEnumDecoder,
  getEnumEncoder,
  getU32Decoder,
  getU32Encoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/kit';

export enum NonceVersion {
  Legacy,
  Current,
}

export type NonceVersionArgs = NonceVersion;

export function getNonceVersionEncoder(): Encoder<NonceVersionArgs> {
  return getEnumEncoder(NonceVersion, { size: getU32Encoder() });
}

export function getNonceVersionDecoder(): Decoder<NonceVersion> {
  return getEnumDecoder(NonceVersion, { size: getU32Decoder() });
}

export function getNonceVersionCodec(): Codec<NonceVersionArgs, NonceVersion> {
  return combineCodec(getNonceVersionEncoder(), getNonceVersionDecoder());
}
