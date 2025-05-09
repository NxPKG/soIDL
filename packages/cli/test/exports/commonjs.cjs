const path = require('path');
const { soidl } = require('../../dist/index.node.cjs');

const configPath = path.join('test', 'exports', 'mock-config.json');
soidl(['run', '-c', configPath]);
