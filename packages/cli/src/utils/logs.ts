import pico from 'picocolors';

export function logSuccess(...args: unknown[]): void {
    console.log(pico.green('[Success]'), ...args);
}

export function logInfo(...args: unknown[]): void {
    console.log(pico.blueBright('[Info]'), ...args);
}

export function logWarning(...args: unknown[]): void {
    console.log(pico.yellow('[Warning]'), ...args);
}

export function logError(...args: unknown[]): void {
    console.log(pico.red('[Error]'), ...args);
}

export function logDebug(...args: unknown[]): void {
    console.log(pico.magenta('[Debug]'), ...args);
}

export function logBanner(): void {
    console.log(getBanner());
}

function getBanner(): string {
    const textBanner = 'Welcome to Soidl!';
    const gradientBanner = pico.bold(`\x1b[38;2;231;171;97m${textBanner}\x1b[0m`);
    return process.stdout.isTTY && process.stdout.getColorDepth() > 8 ? gradientBanner : textBanner;
}
