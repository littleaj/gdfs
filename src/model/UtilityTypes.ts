export type PlainFunction<Inputs extends any[] = any[], Output = any> =
  (...args: Inputs) => Output;

export type Maybe<T> = T | undefined;

export type DefinedFunction<Inputs extends any[] = any[], DefinedOutput = any> =
  DefinedOutput extends undefined ? never 
  : PlainFunction<Inputs, DefinedOutput>;

export type TotalFunction<Inputs extends any[] = any[], DefinedNonnull = any> =
  DefinedNonnull extends undefined | null ? never 
  : PlainFunction<Inputs, DefinedNonnull>;

export type Predicate<Inputs extends any[] = any[]> = PlainFunction<Inputs, boolean>;