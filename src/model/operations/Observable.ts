import { PlainFunction } from "../UtilityTypes";
import { OperationResponse, Operation } from "./Operation";

export type ObserverCallback<T extends Operation> = (result: OperationResponse<ReturnType<T>>) => void;

export interface ObservableOperation<OpFn extends Operation = PlainFunction> {
  (...args: Parameters<OpFn>): void;
  addObserver(observer: ObserverCallback<OpFn>): void; // XXX maybe this should have a default error path & the cb is just for success
}

export function createObservableDelegate<Op extends Operation>(op: Op): ObservableOperation<Op> {
  console.log("Building observable function for ", op);
  const observers = new Set<ObserverCallback<Op>>();
  const delegateOp = (...args: Parameters<Op>): void => {
    console.log("Running ", op, "...");
    let response: OperationResponse<ReturnType<Op>> = {
      success: true,   
    };
    try {
      response.data = op(...args);
    } catch (e) {
      response.success = false;
      response.message = "" + e;
    }
    observers.forEach(cb => cb(response));
  };
  delegateOp.addObserver = (cb: ObserverCallback<Op>) => observers.add(cb);
  return delegateOp;
}
