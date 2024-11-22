import { MaybeAsyncGetter } from "./TypeUtils";

export interface OperationResult<T = void> {
  success: boolean;
  message?: string;
  data?: MaybeAsyncGetter<T>;
}

export type Operation<T = any, P extends any[] = any[]> = (...args: P) => OperationResult<T>;