import type { NodeKind } from '@soidl/nodes';

import { mergeVisitor } from './mergeVisitor';
import { Visitor } from './visitor';

export function voidVisitor<TNodeKind extends NodeKind = NodeKind>(
    options: { keys?: TNodeKind[] } = {},
): Visitor<void, TNodeKind> {
    return mergeVisitor(
        () => undefined,
        () => undefined,
        options,
    );
}
