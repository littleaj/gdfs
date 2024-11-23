import { OperationResult, Operation } from "./Operation";

export type ObserverCallback<R> = (result: OperationResult<R>) => void;

export interface ObservableDelegate<T extends Operation<any>> {
  (...args: Parameters<T>): void;
  addObserver(observer: ObserverCallback<T>): void;
}

export type ObserveableFacade<T> = {
  [key in keyof T]: T[key] extends Operation ? ObservableDelegate<T[key]> : T[key];
}

export function createObservableDelegate<T extends Operation>(op: T): ObservableDelegate<T> {
  const observers = new Set<ObserverCallback<T>>();
  const delegateOp = (...args: Parameters<T>): void => {
    const result = op(...args);
    observers.forEach(cb => cb(result));
  };
  delegateOp.addObserver = (cb: ObserverCallback<T>) => observers.add(cb);
  return delegateOp;
}
