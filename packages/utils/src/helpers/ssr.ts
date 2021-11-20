// noinspection JSUnusedGlobalSymbols

export const isBrowser: boolean = typeof window !== 'undefined';
export const isServer = !isBrowser;
