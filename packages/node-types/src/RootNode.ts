import type { ProgramNode } from './ProgramNode';
import type { SoidlVersion } from './shared';

export interface RootNode<
    TProgram extends ProgramNode = ProgramNode,
    TAdditionalPrograms extends ProgramNode[] = ProgramNode[],
> {
    readonly kind: 'rootNode';

    // Data.
    readonly standard: 'soidl';
    readonly version: SoidlVersion;

    // Children.
    readonly program: TProgram;
    readonly additionalPrograms: TAdditionalPrograms;
}
