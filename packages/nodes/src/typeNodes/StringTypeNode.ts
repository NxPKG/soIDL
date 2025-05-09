import type { BytesEncoding, StringTypeNode } from '@soidl/node-types';

export function stringTypeNode<TEncoding extends BytesEncoding>(encoding: TEncoding): StringTypeNode<TEncoding> {
    return Object.freeze({
        kind: 'stringTypeNode',

        // Data.
        encoding,
    });
}
