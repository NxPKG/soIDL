/**
 * Heavily inspired by @solana/errors.
 * @see https://github.com/anza-xyz/kit/blob/main/packages/errors
 *
 * ---
 *
 * WARNING:
 *   - Don't remove error codes
 *   - Don't change or reorder error codes.
 *
 * Good naming conventions:
 *   - Prefixing common errors — e.g. under the same package — can be a good way to namespace them.
 *   - Use consistent names — e.g. choose `PDA` or `PROGRAM_DERIVED_ADDRESS` and stick with it. Ensure your names are consistent with existing error codes. The decision might have been made for you.
 *   - Recommended prefixes and suffixes:
 *     - `MALFORMED_`: Some input was not constructed properly. E.g. `MALFORMED_BASE58_ENCODED_ADDRESS`.
 *     - `INVALID_`: Some input is invalid (other than because it was MALFORMED). E.g. `INVALID_NUMBER_OF_BYTES`.
 *     - `EXPECTED_`: Some input was different than expected, no need to specify the "GOT" part unless necessary. E.g. `EXPECTED_DECODED_ACCOUNT`.
 *     - `_CANNOT_`: Some operation cannot be performed or some input cannot be used due to some condition. E.g. `CANNOT_DECODE_EMPTY_BYTE_ARRAY` or `PDA_CANNOT_END_WITH_PDA_MARKER`.
 *     - `_MUST_BE_`: Some condition must be true. E.g. `NONCE_TRANSACTION_FIRST_INSTRUCTION_MUST_BE_ADVANCE_NONCE`.
 *     - `_FAILED_TO_`: Tried to perform some operation and failed. E.g. `FAILED_TO_DECODE_ACCOUNT`.
 *     - `_NOT_FOUND`: Some operation lead to not finding something. E.g. `ACCOUNT_NOT_FOUND`.
 *     - `_OUT_OF_RANGE`: Some value is out of range. E.g. `ENUM_DISCRIMINATOR_OUT_OF_RANGE`.
 *     - `_EXCEEDED`: Some limit was exceeded. E.g. `PDA_MAX_SEED_LENGTH_EXCEEDED`.
 *     - `_MISMATCH`: Some elements do not match. E.g. `ENCODER_DECODER_FIXED_SIZE_MISMATCH`.
 *     - `_MISSING`: Some required input is missing. E.g. `TRANSACTION_FEE_PAYER_MISSING`.
 *     - `_UNIMPLEMENTED`: Some required component is not available in the environment. E.g. `SUBTLE_CRYPTO_VERIFY_FUNCTION_UNIMPLEMENTED`.
 */
export const SOIDL_ERROR__UNRECOGNIZED_NODE_KIND = 1;
export const SOIDL_ERROR__UNEXPECTED_NODE_KIND = 2;
export const SOIDL_ERROR__UNEXPECTED_NESTED_NODE_KIND = 3;
export const SOIDL_ERROR__LINKED_NODE_NOT_FOUND = 4;
export const SOIDL_ERROR__NODE_FILESYSTEM_FUNCTION_UNAVAILABLE = 5;
export const SOIDL_ERROR__VERSION_MISMATCH = 6;
export const SOIDL_ERROR__UNRECOGNIZED_NUMBER_FORMAT = 7;
export const SOIDL_ERROR__UNRECOGNIZED_BYTES_ENCODING = 8;
export const SOIDL_ERROR__ENUM_VARIANT_NOT_FOUND = 9;
export const SOIDL_ERROR__DISCRIMINATOR_FIELD_NOT_FOUND = 10;
export const SOIDL_ERROR__DISCRIMINATOR_FIELD_HAS_NO_DEFAULT_VALUE = 11;

// Visitors-related errors.
// Reserve error codes in the range [1200000-1200999].
export const SOIDL_ERROR__VISITORS__CANNOT_ADD_DUPLICATED_PDA_NAMES = 1200000;
export const SOIDL_ERROR__VISITORS__INVALID_PDA_SEED_VALUES = 1200001;
export const SOIDL_ERROR__VISITORS__CYCLIC_DEPENDENCY_DETECTED_WHEN_RESOLVING_INSTRUCTION_DEFAULT_VALUES = 1200002;
export const SOIDL_ERROR__VISITORS__CANNOT_USE_OPTIONAL_ACCOUNT_AS_PDA_SEED_VALUE = 1200003;
export const SOIDL_ERROR__VISITORS__INVALID_INSTRUCTION_DEFAULT_VALUE_DEPENDENCY = 1200004;
export const SOIDL_ERROR__VISITORS__ACCOUNT_FIELD_NOT_FOUND = 1200005;
export const SOIDL_ERROR__VISITORS__INVALID_NUMBER_WRAPPER = 1200006;
export const SOIDL_ERROR__VISITORS__CANNOT_EXTEND_MISSING_VISIT_FUNCTION = 1200007;
export const SOIDL_ERROR__VISITORS__FAILED_TO_VALIDATE_NODE = 1200008;
export const SOIDL_ERROR__VISITORS__INSTRUCTION_ENUM_ARGUMENT_NOT_FOUND = 1200009;
export const SOIDL_ERROR__VISITORS__CANNOT_FLATTEN_STRUCT_WITH_CONFLICTING_ATTRIBUTES = 1200010;
export const SOIDL_ERROR__VISITORS__RENDER_MAP_KEY_NOT_FOUND = 1200011;
export const SOIDL_ERROR__VISITORS__CANNOT_REMOVE_LAST_PATH_IN_NODE_STACK = 1200012;

// Anchor-related errors.
// Reserve error codes in the range [2100000-2100999].
export const SOIDL_ERROR__ANCHOR__UNRECOGNIZED_IDL_TYPE = 2100000;
export const SOIDL_ERROR__ANCHOR__ACCOUNT_TYPE_MISSING = 2100001;
export const SOIDL_ERROR__ANCHOR__ARGUMENT_TYPE_MISSING = 2100002;
export const SOIDL_ERROR__ANCHOR__TYPE_PATH_MISSING = 2100003;
export const SOIDL_ERROR__ANCHOR__SEED_KIND_UNIMPLEMENTED = 2100004;
export const SOIDL_ERROR__ANCHOR__PROGRAM_ID_KIND_UNIMPLEMENTED = 2100005;

// Renderers-related errors.
// Reserve error codes in the range [2800000-2800999].
export const SOIDL_ERROR__RENDERERS__UNSUPPORTED_NODE = 2800000;

/**
 * A union of every Soidl error code
 *
 * You might be wondering why this is not a TypeScript enum or const enum.
 *
 * One of the goals of this library is to enable people to use some or none of it without having to
 * bundle all of it.
 *
 * If we made the set of error codes an enum then anyone who imported it (even if to only use a
 * single error code) would be forced to bundle every code and its label.
 *
 * Const enums appear to solve this problem by letting the compiler inline only the codes that are
 * actually used. Unfortunately exporting ambient (const) enums from a library like `@soidl/errors`
 * is not safe, for a variety of reasons covered here: https://stackoverflow.com/a/28818850
 */
export type SoidlErrorCode =
    | typeof SOIDL_ERROR__ANCHOR__ACCOUNT_TYPE_MISSING
    | typeof SOIDL_ERROR__ANCHOR__ARGUMENT_TYPE_MISSING
    | typeof SOIDL_ERROR__ANCHOR__PROGRAM_ID_KIND_UNIMPLEMENTED
    | typeof SOIDL_ERROR__ANCHOR__SEED_KIND_UNIMPLEMENTED
    | typeof SOIDL_ERROR__ANCHOR__TYPE_PATH_MISSING
    | typeof SOIDL_ERROR__ANCHOR__UNRECOGNIZED_IDL_TYPE
    | typeof SOIDL_ERROR__DISCRIMINATOR_FIELD_HAS_NO_DEFAULT_VALUE
    | typeof SOIDL_ERROR__DISCRIMINATOR_FIELD_NOT_FOUND
    | typeof SOIDL_ERROR__ENUM_VARIANT_NOT_FOUND
    | typeof SOIDL_ERROR__LINKED_NODE_NOT_FOUND
    | typeof SOIDL_ERROR__NODE_FILESYSTEM_FUNCTION_UNAVAILABLE
    | typeof SOIDL_ERROR__RENDERERS__UNSUPPORTED_NODE
    | typeof SOIDL_ERROR__UNEXPECTED_NESTED_NODE_KIND
    | typeof SOIDL_ERROR__UNEXPECTED_NODE_KIND
    | typeof SOIDL_ERROR__UNRECOGNIZED_BYTES_ENCODING
    | typeof SOIDL_ERROR__UNRECOGNIZED_NODE_KIND
    | typeof SOIDL_ERROR__UNRECOGNIZED_NUMBER_FORMAT
    | typeof SOIDL_ERROR__VERSION_MISMATCH
    | typeof SOIDL_ERROR__VISITORS__ACCOUNT_FIELD_NOT_FOUND
    | typeof SOIDL_ERROR__VISITORS__CANNOT_ADD_DUPLICATED_PDA_NAMES
    | typeof SOIDL_ERROR__VISITORS__CANNOT_EXTEND_MISSING_VISIT_FUNCTION
    | typeof SOIDL_ERROR__VISITORS__CANNOT_FLATTEN_STRUCT_WITH_CONFLICTING_ATTRIBUTES
    | typeof SOIDL_ERROR__VISITORS__CANNOT_REMOVE_LAST_PATH_IN_NODE_STACK
    | typeof SOIDL_ERROR__VISITORS__CANNOT_USE_OPTIONAL_ACCOUNT_AS_PDA_SEED_VALUE
    | typeof SOIDL_ERROR__VISITORS__CYCLIC_DEPENDENCY_DETECTED_WHEN_RESOLVING_INSTRUCTION_DEFAULT_VALUES
    | typeof SOIDL_ERROR__VISITORS__FAILED_TO_VALIDATE_NODE
    | typeof SOIDL_ERROR__VISITORS__INSTRUCTION_ENUM_ARGUMENT_NOT_FOUND
    | typeof SOIDL_ERROR__VISITORS__INVALID_INSTRUCTION_DEFAULT_VALUE_DEPENDENCY
    | typeof SOIDL_ERROR__VISITORS__INVALID_NUMBER_WRAPPER
    | typeof SOIDL_ERROR__VISITORS__INVALID_PDA_SEED_VALUES
    | typeof SOIDL_ERROR__VISITORS__RENDER_MAP_KEY_NOT_FOUND;
