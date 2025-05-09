import { NodeKind } from '@soidl/nodes';
import { mapVisitor, Visitor } from '@soidl/visitors-core';

import { RenderMap } from './RenderMap';

export function writeRenderMapVisitor<TNodeKind extends NodeKind = NodeKind>(
    visitor: Visitor<RenderMap, TNodeKind>,
    path: string,
): Visitor<void, TNodeKind> {
    return mapVisitor(visitor, renderMap => renderMap.write(path));
}
