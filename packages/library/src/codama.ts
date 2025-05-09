import { SOIDL_ERROR__VERSION_MISMATCH } from '@soidl/errors';
import { SoidlError } from '@soidl/errors';
import { assertIsNode, SoidlVersion, Node, RootNode } from '@soidl/nodes';
import { visit, Visitor } from '@soidl/visitors';

export interface Soidl {
    accept<T>(visitor: Visitor<T, 'rootNode'>): T;
    clone(): Soidl;
    getJson(): string;
    getRoot(): RootNode;
    update(visitor: Visitor<Node | null, 'rootNode'>): void;
}

export function createFromRoot(root: RootNode): Soidl {
    let currentRoot = root;
    validateSoidlVersion(currentRoot.version);
    return {
        accept<T>(visitor: Visitor<T, 'rootNode'>): T {
            return visit(currentRoot, visitor);
        },
        clone(): Soidl {
            return createFromRoot({ ...currentRoot });
        },
        getJson(): string {
            return JSON.stringify(currentRoot);
        },
        getRoot(): RootNode {
            return currentRoot;
        },
        update(visitor: Visitor<Node | null, 'rootNode'>): void {
            const newRoot = visit(currentRoot, visitor);
            assertIsNode(newRoot, 'rootNode');
            currentRoot = newRoot;
        },
    };
}

export function createFromJson(json: string): Soidl {
    return createFromRoot(JSON.parse(json) as RootNode);
}

export function validateSoidlVersion(rootVersion: SoidlVersion): void {
    const soidlVersion = __VERSION__;
    if (rootVersion === soidlVersion) return;
    const [rootMajor, rootMinor] = rootVersion.split('.').map(Number);
    const [SoidlMajor, SoidlMinor] = soidlVersion.split('.').map(Number);
    const isZeroMajor = rootMajor === 0 && SoidlMajor === 0;
    if (isZeroMajor && rootMinor === SoidlMinor) return;
    if (rootMajor === SoidlMajor) return;
    throw new SoidlError(SOIDL_ERROR__VERSION_MISMATCH, { soidlVersion, rootVersion });
}
