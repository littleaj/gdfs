export type PlainFunction<P extends any[] = any[], R = any> = (...args: P) => R;

export type Maybe<T> = T | undefined;

export type DefinedFunction<P extends any[] = any[], R = any> = R extends undefined ? never : PlainFunction<P, R>;
export type TotalFunction<P extends any[] = any[], R = any> = R extends undefined | null ? never : PlainFunction<P, R>;