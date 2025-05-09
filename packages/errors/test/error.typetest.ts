import { PublicKeyTypeNode } from '@soidl/node-types';

import { SoidlError, SoidlErrorCode, isSoidlError } from '../src';
import * as SoidlErrorCodeModule from '../src/codes';
import { SoidlErrorContext } from '../src/context';

const { SOIDL_ERROR__UNRECOGNIZED_NODE_KIND, SOIDL_ERROR__UNEXPECTED_NODE_KIND } = SoidlErrorCodeModule;

// If this line raises a type error, you might have forgotten to add a new error to the
// `SoidlErrorCode` union in `src/codes.ts`.
Object.values(SoidlErrorCodeModule) satisfies SoidlErrorCode[];

const unexpectedNodeKindError = new SoidlError(SOIDL_ERROR__UNEXPECTED_NODE_KIND, {
    expectedKinds: ['numberTypeNode', 'stringTypeNode'],
    kind: 'publicKeyTypeNode',
    node: {} as PublicKeyTypeNode,
});

{
    const code = unexpectedNodeKindError.context.__code;
    code satisfies typeof SOIDL_ERROR__UNEXPECTED_NODE_KIND;
    // @ts-expect-error Wrong error code.
    code satisfies typeof SOIDL_ERROR__UNRECOGNIZED_NODE_KIND;
}

{
    // @ts-expect-error Missing context.
    new SoidlError(SOIDL_ERROR__UNEXPECTED_NODE_KIND, {});
    // @ts-expect-error Missing part of the context.
    new SoidlError(SOIDL_ERROR__UNEXPECTED_NODE_KIND, {
        expectedKinds: ['numberTypeNode', 'stringTypeNode'],
        node: {} as PublicKeyTypeNode,
    });
    new SoidlError(SOIDL_ERROR__UNEXPECTED_NODE_KIND, {
        // @ts-expect-error Wrong context attribute.
        foo: 'bar',
    });
}

unexpectedNodeKindError.context satisfies SoidlErrorContext[typeof SOIDL_ERROR__UNEXPECTED_NODE_KIND];
// @ts-expect-error Non existent context property.
unexpectedNodeKindError.context.feePayer satisfies never;

// @ts-expect-error Missing context.
new SoidlError(SOIDL_ERROR__UNRECOGNIZED_NODE_KIND);
// @ts-expect-error Missing context.
new SoidlError(SOIDL_ERROR__UNEXPECTED_NODE_KIND);

const unknownError = null as unknown as SoidlError;
if (unknownError.context.__code === SOIDL_ERROR__UNEXPECTED_NODE_KIND) {
    unknownError.context satisfies SoidlErrorContext[typeof SOIDL_ERROR__UNEXPECTED_NODE_KIND];
    // @ts-expect-error Context belongs to another error code
    unknownError.context satisfies SoidlErrorContext[typeof SOIDL_ERROR__UNRECOGNIZED_NODE_KIND];
}

const e = null as unknown;
if (isSoidlError(e)) {
    e.context satisfies Readonly<{ __code: SoidlErrorCode }>;
}
if (isSoidlError(e, SOIDL_ERROR__UNEXPECTED_NODE_KIND)) {
    e.context satisfies SoidlErrorContext[typeof SOIDL_ERROR__UNEXPECTED_NODE_KIND];
    // @ts-expect-error Context belongs to another error code
    e.context satisfies SoidlErrorContext[typeof SOIDL_ERROR__UNRECOGNIZED_NODE_KIND];
}

// `SoidlErrorContext` must not contain any keys reserved by `ErrorOptions` (eg. `cause`)
null as unknown as SoidlErrorContext satisfies {
    [Code in keyof SoidlErrorContext]: SoidlErrorContext[Code] extends undefined
        ? undefined
        : {
              [PP in keyof SoidlErrorContext[Code]]: PP extends keyof ErrorOptions
                  ? never
                  : SoidlErrorContext[Code][PP];
          };
};
