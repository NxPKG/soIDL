import type { SoidlVersion, ProgramNode, RootNode } from '@soidl/node-types';

export function rootNode<TProgram extends ProgramNode, const TAdditionalPrograms extends ProgramNode[] = []>(
    program: TProgram,
    additionalPrograms?: TAdditionalPrograms,
): RootNode<TProgram, TAdditionalPrograms> {
    return Object.freeze({
        kind: 'rootNode',

        // Data.
        standard: 'soidl',
        version: __VERSION__ as SoidlVersion,

        // Children.
        program,
        additionalPrograms: (additionalPrograms ?? []) as TAdditionalPrograms,
    });
}
