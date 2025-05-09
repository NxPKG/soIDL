/**
 * Heavily inspired by @solana/errors.
 * @see https://github.com/anza-xyz/kit/blob/main/packages/errors
 */

import { SoidlErrorCode } from './codes';
import { SoidlErrorContext } from './context';
import { getErrorMessage } from './message-formatter';

export function isSoidlError<TErrorCode extends SoidlErrorCode>(
    e: unknown,
    code?: TErrorCode,
): e is SoidlError<TErrorCode> {
    const isSoidlError = e instanceof Error && e.name === 'SoidlError';
    if (isSoidlError) {
        if (code !== undefined) {
            return (e as SoidlError<TErrorCode>).context.__code === code;
        }
        return true;
    }
    return false;
}

type SoidlErrorCodedContext = Readonly<{
    [P in SoidlErrorCode]: (SoidlErrorContext[P] extends undefined ? object : SoidlErrorContext[P]) & {
        __code: P;
    };
}>;

export class SoidlError<TErrorCode extends SoidlErrorCode = SoidlErrorCode> extends Error {
    readonly context: SoidlErrorCodedContext[TErrorCode];
    constructor(
        ...[code, contextAndErrorOptions]: SoidlErrorContext[TErrorCode] extends undefined
            ? [code: TErrorCode, errorOptions?: ErrorOptions | undefined]
            : [code: TErrorCode, contextAndErrorOptions: SoidlErrorContext[TErrorCode] & (ErrorOptions | undefined)]
    ) {
        let context: SoidlErrorContext[TErrorCode] | undefined;
        let errorOptions: ErrorOptions | undefined;
        if (contextAndErrorOptions) {
            // If the `ErrorOptions` type ever changes, update this code.
            const { cause, ...contextRest } = contextAndErrorOptions;
            if (cause) {
                errorOptions = { cause };
            }
            if (Object.keys(contextRest).length > 0) {
                context = contextRest as SoidlErrorContext[TErrorCode];
            }
        }
        const message = getErrorMessage(code, context);
        super(message, errorOptions);
        this.context = {
            __code: code,
            ...context,
        } as SoidlErrorCodedContext[TErrorCode];
        // This is necessary so that `isSoidlError()` can identify a `SoidlError` without having
        // to import the class for use in an `instanceof` check.
        this.name = 'SoidlError';
    }
}
