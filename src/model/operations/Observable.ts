import { OperationStatus, Operation } from "./Operation";

export type ObserverCallback<T extends Operation<any[], any>> = 
  T extends Operation<any[], infer R> ?
  R extends void ? (result: OperationStatus) => void : (result: OperationStatus<R>) => void : never;

export interface ObservableOperation<OpFn extends Operation = Operation<any[], any>> {
  (...args: Parameters<OpFn>): void;
  addObserver(observer: ObserverCallback<OpFn>): void;
}

type ObservedOperationOrDefault<T, K extends keyof T> = T[K] extends Operation ? ObservableOperation<T[K]> : T[K]

export type ObservableFacade<T> = {
  [K in keyof T]: ObservedOperationOrDefault<T, K>;
}

export function createObservableDelegate<OpFn extends Operation>(op: OpFn): ObservableOperation<OpFn> {
  const observers = new Set<ObserverCallback<OpFn>>();
  const delegateOp = (...args: Parameters<OpFn>): void => {
    const result = op(...args);
    observers.forEach(cb => cb(result));
  };
  delegateOp.addObserver = (cb: ObserverCallback<OpFn>) => observers.add(cb);
  return delegateOp;
}
