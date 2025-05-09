// This ensures that we do not rely on `__dirname` in ES modules even when it is polyfilled.
globalThis.__dirname = 'DO_NOT_USE';

import { definedTypeNode, numberTypeNode } from '@soidl/nodes';
import { visit } from '@soidl/visitors-core';

import { getRenderMapVisitor } from '../../dist/index.node.mjs';

const node = definedTypeNode({ name: 'answerToLife', type: numberTypeNode('u8') });
visit(node, getRenderMapVisitor());
