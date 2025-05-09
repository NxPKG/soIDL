import { Command } from 'commander';

export type ProgramOptions = Readonly<{
    config?: string;
    debug?: boolean;
    idl?: string;
}>;

export function setProgramOptions(program: Command): void {
    program
        .option('--debug', 'include debugging information, such as stack dump')
        .option('-i, --idl <path>', 'The path to the IDL to use.')
        .option('-c, --config <path>', 'The path to the Soidl configuration file. Defaults to `soidl.(js|json)`.');
}
