import type { Docs } from '@soidl/node-types';

export type DocsInput = string[] | string;

export function parseDocs(docs: DocsInput | null | undefined): Docs {
    if (docs === null || docs === undefined) return [];
    return Array.isArray(docs) ? docs : [docs];
}
