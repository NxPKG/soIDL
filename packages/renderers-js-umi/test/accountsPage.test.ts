import {
    accountNode,
    constantPdaSeedNodeFromProgramId,
    constantPdaSeedNodeFromString,
    pdaLinkNode,
    pdaNode,
    programNode,
    publicKeyTypeNode,
    variablePdaSeedNode,
} from '@soidl/nodes';
import { visit } from '@soidl/visitors-core';
import { test } from 'vitest';

import { getRenderMapVisitor } from '../src';
import { renderMapContains } from './_setup';

test('it renders PDA helpers for PDA', async () => {
    // Given the following program with 1 account and 1 pda with seeds.
    const node = programNode({
        accounts: [accountNode({ name: 'foo', pda: pdaLinkNode('bar') })],
        name: 'myProgram',
        pdas: [
            pdaNode({
                name: 'bar',
                seeds: [
                    constantPdaSeedNodeFromProgramId(),
                    constantPdaSeedNodeFromString('utf8', 'bar'),
                    variablePdaSeedNode('authority', publicKeyTypeNode()),
                ],
            }),
        ],
        publicKey: '1111',
    });

    // When we render it.
    const renderMap = visit(node, getRenderMapVisitor());

    // Then we expect the following fetch helper functions delegating to findBarPda.
    await renderMapContains(renderMap, 'accounts/foo.ts', [
        'export function findFooPda',
        'export async function fetchFooFromSeeds',
        'export async function safeFetchFooFromSeeds',
        'publicKeySerializer().serialize(programId)',
        "string({ size: 'variable' }).serialize('bar')",
        'publicKeySerializer().serialize(seeds.authority)',
    ]);
});
