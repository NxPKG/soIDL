/**
 * Heavily inspired by @solana/errors.
 * @see https://github.com/anza-xyz/kit/blob/main/packages/errors
 */

import { SoidlErrorCode } from './codes';
import { encodeContextObject } from './context';
import { SoidlErrorMessages } from './messages';

export function getHumanReadableErrorMessage<TErrorCode extends SoidlErrorCode>(
    code: TErrorCode,
    context: object = {},
): string {
    const messageFormatString = SoidlErrorMessages[code];
    const message = messageFormatString.replace(/(?<!\\)\$(\w+)/g, (substring, variableName) =>
        variableName in context ? `${context[variableName as keyof typeof context] as string}` : substring,
    );
    return message;
}

export function getErrorMessage<TErrorCode extends SoidlErrorCode>(code: TErrorCode, context: object = {}): string {
    if (process.env.NODE_ENV !== 'production') {
        return getHumanReadableErrorMessage(code, context);
    } else {
        let decodingAdviceMessage = `Soidl error #${code}; Decode this error by running \`npx @soidl/errors decode -- ${code}`;
        if (Object.keys(context).length) {
            /**
             * DANGER: Be sure that the shell command is escaped in such a way that makes it
             *         impossible for someone to craft malicious context values that would result in
             *         an exploit against anyone who bindly copy/pastes it into their terminal.
             */
            decodingAdviceMessage += ` '${encodeContextObject(context)}'`;
        }
        return `${decodingAdviceMessage}\``;
    }
}
