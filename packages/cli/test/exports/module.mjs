import path from 'path';
import { soidl } from '../../dist/index.node.mjs';

const configPath = path.join('test', 'exports', 'mock-config.json');
soidl(['run', '-c', configPath]);
