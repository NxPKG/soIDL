import { RootNode } from '@soidl/nodes';
import { visit } from '@soidl/visitors';

import { defaultVisitor } from './defaultVisitor';
import { IdlV00, rootNodeFromAnchorV00 } from './v00';
import { IdlV01, rootNodeFromAnchorV01 } from './v01';

export * from './discriminators';
export * from './v00';
export * from './v01';

export type AnchorIdl = IdlV00 | IdlV01;

export function rootNodeFromAnchor(idl: AnchorIdl): RootNode {
    return visit(rootNodeFromAnchorWithoutDefaultVisitor(idl), defaultVisitor());
}

export function rootNodeFromAnchorWithoutDefaultVisitor(idl: AnchorIdl): RootNode {
    if ((idl.metadata as { spec?: string })?.spec === '0.1.0') {
        return rootNodeFromAnchorV01(idl as IdlV01);
    }

    return rootNodeFromAnchorV00(idl as IdlV00);
}
