export type PlainFunction<Inputs extends any[] = any[], Output = any> =
  (...args: Inputs) => Output;

// export type Nullable<T> = T | null;

export type Maybe<T> = T | undefined;

export type Predicate<Inputs extends any[] = any[]> = PlainFunction<Inputs, boolean>;