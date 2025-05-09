import { createProgram, logDebug, logError } from '@soidl/cli';

const program = createProgram();

export async function run(argv: readonly string[]) {
    try {
        await program.parseAsync(argv);
    } catch (err) {
        if (program.opts().debug) {
            logDebug(`${(err as { stack: string }).stack}`);
        }
        logError((err as { message: string }).message);
        process.exitCode = 1;
    }
}
