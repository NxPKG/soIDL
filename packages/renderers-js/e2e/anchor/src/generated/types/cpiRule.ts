/**
 * This code was AUTOGENERATED using the soidl library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun soidl to update it.
 *
 * @see https://github.com/soidl-idl/soidl
 */

import {
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getArrayDecoder,
  getArrayEncoder,
  getDiscriminatedUnionDecoder,
  getDiscriminatedUnionEncoder,
  getStructDecoder,
  getStructEncoder,
  getTupleDecoder,
  getTupleEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type GetDiscriminatedUnionVariant,
  type GetDiscriminatedUnionVariantContent,
} from '@solana/kit';

/**
 * Controls which protocols can interact with the token by
 * enforcing Allow and Deny lists.
 */

export type CpiRule =
  | { __kind: 'Allow'; fields: readonly [Array<Address>] }
  | { __kind: 'Deny'; fields: readonly [Array<Address>] };

export type CpiRuleArgs = CpiRule;

export function getCpiRuleEncoder(): Encoder<CpiRuleArgs> {
  return getDiscriminatedUnionEncoder([
    [
      'Allow',
      getStructEncoder([
        ['fields', getTupleEncoder([getArrayEncoder(getAddressEncoder())])],
      ]),
    ],
    [
      'Deny',
      getStructEncoder([
        ['fields', getTupleEncoder([getArrayEncoder(getAddressEncoder())])],
      ]),
    ],
  ]);
}

export function getCpiRuleDecoder(): Decoder<CpiRule> {
  return getDiscriminatedUnionDecoder([
    [
      'Allow',
      getStructDecoder([
        ['fields', getTupleDecoder([getArrayDecoder(getAddressDecoder())])],
      ]),
    ],
    [
      'Deny',
      getStructDecoder([
        ['fields', getTupleDecoder([getArrayDecoder(getAddressDecoder())])],
      ]),
    ],
  ]);
}

export function getCpiRuleCodec(): Codec<CpiRuleArgs, CpiRule> {
  return combineCodec(getCpiRuleEncoder(), getCpiRuleDecoder());
}

// Data Enum Helpers.
export function cpiRule(
  kind: 'Allow',
  data: GetDiscriminatedUnionVariantContent<
    CpiRuleArgs,
    '__kind',
    'Allow'
  >['fields']
): GetDiscriminatedUnionVariant<CpiRuleArgs, '__kind', 'Allow'>;
export function cpiRule(
  kind: 'Deny',
  data: GetDiscriminatedUnionVariantContent<
    CpiRuleArgs,
    '__kind',
    'Deny'
  >['fields']
): GetDiscriminatedUnionVariant<CpiRuleArgs, '__kind', 'Deny'>;
export function cpiRule<K extends CpiRuleArgs['__kind'], Data>(
  kind: K,
  data?: Data
) {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isCpiRule<K extends CpiRule['__kind']>(
  kind: K,
  value: CpiRule
): value is CpiRule & { __kind: K } {
  return value.__kind === kind;
}
