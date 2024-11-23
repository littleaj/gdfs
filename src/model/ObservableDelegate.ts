import { OperationResult, Task, Action, Operation } from "./Operation";

export type ObserverCallback<T extends Operation> = 
  T extends Action ? 
    (result: OperationResult) => void :
    T extends Task<infer DataType> ? (result: OperationResult<DataType>) => void : never;

export interface ObservableDelegate<OpFn extends Operation> {
  (...args: Parameters<OpFn>): void;
  addObserver(observer: ObserverCallback<OpFn>): void;
}

type DelegateOrDefault<T, K extends keyof T> = T[K] extends Operation ? ObservableDelegate<T[K]> : T[K]

export type ObservableFacade<T> = {
  [key in keyof T]: DelegateOrDefault<T, key>;
}

export function createObservableDelegate<OpFn extends Operation>(op: OpFn): ObservableDelegate<OpFn> {
  const observers = new Set<ObserverCallback<OpFn>>();
  const delegateOp = (...args: Parameters<OpFn>): void => {
    const result = op(...args);
    observers.forEach(cb => cb(result));
  };
  delegateOp.addObserver = (cb: ObserverCallback<OpFn>) => observers.add(cb);
  return delegateOp;
}
