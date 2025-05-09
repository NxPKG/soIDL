const { definedTypeNode, numberTypeNode } = require('@soidl/nodes');
const { visit } = require('@soidl/visitors-core');

const { getRenderMapVisitor } = require('../../dist/index.node.cjs');

const node = definedTypeNode({ name: 'answerToLife', type: numberTypeNode('u8') });
visit(node, getRenderMapVisitor());
