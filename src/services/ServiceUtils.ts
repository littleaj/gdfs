export function throwUninitialized<T>(): T {
  throw new Error("AuthService not initialized");
}