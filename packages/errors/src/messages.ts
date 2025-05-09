/**
 * Heavily inspired by @solana/errors.
 * @see https://github.com/anza-xyz/kit/blob/main/packages/errors
 */

import {
    SOIDL_ERROR__ANCHOR__ACCOUNT_TYPE_MISSING,
    SOIDL_ERROR__ANCHOR__ARGUMENT_TYPE_MISSING,
    SOIDL_ERROR__ANCHOR__PROGRAM_ID_KIND_UNIMPLEMENTED,
    SOIDL_ERROR__ANCHOR__SEED_KIND_UNIMPLEMENTED,
    SOIDL_ERROR__ANCHOR__TYPE_PATH_MISSING,
    SOIDL_ERROR__ANCHOR__UNRECOGNIZED_IDL_TYPE,
    SOIDL_ERROR__DISCRIMINATOR_FIELD_HAS_NO_DEFAULT_VALUE,
    SOIDL_ERROR__DISCRIMINATOR_FIELD_NOT_FOUND,
    SOIDL_ERROR__ENUM_VARIANT_NOT_FOUND,
    SOIDL_ERROR__LINKED_NODE_NOT_FOUND,
    SOIDL_ERROR__NODE_FILESYSTEM_FUNCTION_UNAVAILABLE,
    SOIDL_ERROR__RENDERERS__UNSUPPORTED_NODE,
    SOIDL_ERROR__UNEXPECTED_NESTED_NODE_KIND,
    SOIDL_ERROR__UNEXPECTED_NODE_KIND,
    SOIDL_ERROR__UNRECOGNIZED_BYTES_ENCODING,
    SOIDL_ERROR__UNRECOGNIZED_NODE_KIND,
    SOIDL_ERROR__UNRECOGNIZED_NUMBER_FORMAT,
    SOIDL_ERROR__VERSION_MISMATCH,
    SOIDL_ERROR__VISITORS__ACCOUNT_FIELD_NOT_FOUND,
    SOIDL_ERROR__VISITORS__CANNOT_ADD_DUPLICATED_PDA_NAMES,
    SOIDL_ERROR__VISITORS__CANNOT_EXTEND_MISSING_VISIT_FUNCTION,
    SOIDL_ERROR__VISITORS__CANNOT_FLATTEN_STRUCT_WITH_CONFLICTING_ATTRIBUTES,
    SOIDL_ERROR__VISITORS__CANNOT_REMOVE_LAST_PATH_IN_NODE_STACK,
    SOIDL_ERROR__VISITORS__CANNOT_USE_OPTIONAL_ACCOUNT_AS_PDA_SEED_VALUE,
    SOIDL_ERROR__VISITORS__CYCLIC_DEPENDENCY_DETECTED_WHEN_RESOLVING_INSTRUCTION_DEFAULT_VALUES,
    SOIDL_ERROR__VISITORS__FAILED_TO_VALIDATE_NODE,
    SOIDL_ERROR__VISITORS__INSTRUCTION_ENUM_ARGUMENT_NOT_FOUND,
    SOIDL_ERROR__VISITORS__INVALID_INSTRUCTION_DEFAULT_VALUE_DEPENDENCY,
    SOIDL_ERROR__VISITORS__INVALID_NUMBER_WRAPPER,
    SOIDL_ERROR__VISITORS__INVALID_PDA_SEED_VALUES,
    SOIDL_ERROR__VISITORS__RENDER_MAP_KEY_NOT_FOUND,
    SoidlErrorCode,
} from './codes';

/**
 * WARNING:
 *   - Don't change the meaning of an error message.
 */
export const SoidlErrorMessages: Readonly<{
    // This type makes this data structure exhaustive with respect to `SolanaErrorCode`.
    // TypeScript will fail to build this project if add an error code without a message.
    [P in SoidlErrorCode]: string;
}> = {
    [SOIDL_ERROR__ANCHOR__ACCOUNT_TYPE_MISSING]: 'Account type [$name] is missing from the IDL types.',
    [SOIDL_ERROR__ANCHOR__ARGUMENT_TYPE_MISSING]: 'Argument name [$name] is missing from the instruction definition.',
    [SOIDL_ERROR__ANCHOR__PROGRAM_ID_KIND_UNIMPLEMENTED]: 'Program ID kind [$kind] is not implemented.',
    [SOIDL_ERROR__ANCHOR__SEED_KIND_UNIMPLEMENTED]: 'Seed kind [$kind] is not implemented.',
    [SOIDL_ERROR__ANCHOR__TYPE_PATH_MISSING]: 'Field type is missing for path [$path] in [$idlType].',
    [SOIDL_ERROR__ANCHOR__UNRECOGNIZED_IDL_TYPE]: 'Unrecognized Anchor IDL type [$idlType].',
    [SOIDL_ERROR__DISCRIMINATOR_FIELD_HAS_NO_DEFAULT_VALUE]: 'Discriminator field [$field] has no default value.',
    [SOIDL_ERROR__DISCRIMINATOR_FIELD_NOT_FOUND]: 'Could not find discriminator field [$field]',
    [SOIDL_ERROR__ENUM_VARIANT_NOT_FOUND]: 'Enum variant [$variant] not found in enum type [$enumName].',
    [SOIDL_ERROR__LINKED_NODE_NOT_FOUND]: 'Could not find linked node [$name] from [$kind].',
    [SOIDL_ERROR__NODE_FILESYSTEM_FUNCTION_UNAVAILABLE]:
        'Node.js filesystem function [$fsFunction] is not available in your environment.',
    [SOIDL_ERROR__RENDERERS__UNSUPPORTED_NODE]: 'Cannot render the encountered node of kind [$kind].',
    [SOIDL_ERROR__UNEXPECTED_NESTED_NODE_KIND]: 'Expected nested node of kind [$expectedKinds], got [$kind]',
    [SOIDL_ERROR__UNEXPECTED_NODE_KIND]: 'Expected node of kind [$expectedKinds], got [$kind].',
    [SOIDL_ERROR__UNRECOGNIZED_BYTES_ENCODING]: 'Unrecognized bytes encoding [$encoding].',
    [SOIDL_ERROR__UNRECOGNIZED_NODE_KIND]: 'Unrecognized node kind [$kind].',
    [SOIDL_ERROR__UNRECOGNIZED_NUMBER_FORMAT]: 'Unrecognized number format [$format].',
    [SOIDL_ERROR__VERSION_MISMATCH]:
        'The provided RootNode version [$rootVersion] is not compatible with the installed Soidl version [$soidlVersion].',
    [SOIDL_ERROR__VISITORS__ACCOUNT_FIELD_NOT_FOUND]: 'Account [$name] does not have a field named [$missingField].',
    [SOIDL_ERROR__VISITORS__CANNOT_ADD_DUPLICATED_PDA_NAMES]:
        'Cannot add PDAs to program [$programName] because the following PDA names already exist [$duplicatedPdaNames].',
    [SOIDL_ERROR__VISITORS__CANNOT_EXTEND_MISSING_VISIT_FUNCTION]:
        'Cannot extend visitor with function [$visitFunction] as the base visitor does not support it.',
    [SOIDL_ERROR__VISITORS__CANNOT_FLATTEN_STRUCT_WITH_CONFLICTING_ATTRIBUTES]:
        'Cannot flatten struct since this would cause the following attributes to conflict [$conflictingAttributes].',
    [SOIDL_ERROR__VISITORS__CANNOT_REMOVE_LAST_PATH_IN_NODE_STACK]: 'Cannot remove the last path in the node stack.',
    [SOIDL_ERROR__VISITORS__CANNOT_USE_OPTIONAL_ACCOUNT_AS_PDA_SEED_VALUE]:
        'Cannot use optional account [$seedValueName] as the [$seedName] PDA seed for the [$instructionAccountName] account of the [$instructionName] instruction.',
    [SOIDL_ERROR__VISITORS__CYCLIC_DEPENDENCY_DETECTED_WHEN_RESOLVING_INSTRUCTION_DEFAULT_VALUES]:
        "Circular dependency detected when resolving the accounts and arguments' default values of the [$instructionName] instruction. Got the following dependency cycle [$formattedCycle].",
    [SOIDL_ERROR__VISITORS__FAILED_TO_VALIDATE_NODE]: 'Failed to validate the given node [$formattedHistogram].',
    [SOIDL_ERROR__VISITORS__INSTRUCTION_ENUM_ARGUMENT_NOT_FOUND]:
        'Could not find an enum argument named [$argumentName] for instruction [$instructionName].',
    [SOIDL_ERROR__VISITORS__INVALID_INSTRUCTION_DEFAULT_VALUE_DEPENDENCY]:
        'Dependency [$dependencyName] of kind [$dependencyKind] is not a valid dependency of [$parentName] of kind [$parentKind] in the [$instructionName] instruction.',
    [SOIDL_ERROR__VISITORS__INVALID_NUMBER_WRAPPER]: 'Invalid number wrapper kind [$wrapper].',
    [SOIDL_ERROR__VISITORS__INVALID_PDA_SEED_VALUES]:
        'Invalid seed values for PDA [$pdaName] in instruction [$instructionName].',
    [SOIDL_ERROR__VISITORS__RENDER_MAP_KEY_NOT_FOUND]: 'Cannot find key [$key] in RenderMap.',
};
