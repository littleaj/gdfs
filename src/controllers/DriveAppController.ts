import DriveOperations from "../model/DriveOperations";
import { Operation, OperationResult } from "../model/OperationUtils";

type ObserverCallback<R> = (result: OperationResult<R>) => void;


interface ObservableDelegate<T extends Operation<any>> {
  (...args: Parameters<T>): void;
  addObserver(observer: ObserverCallback<T>): void;
}

function createObservableDelegate<T extends Operation>(op: T): ObservableDelegate<T> {
  const observers = new Set<ObserverCallback<T>>();
  const delegateOp = (...args: Parameters<T>): void => {
    const result = op(...args);
    observers.forEach(cb => cb(result));
  }
  delegateOp.addObserver = (cb: ObserverCallback<T>) => observers.add(cb);
  return delegateOp;
}

// type Operator = {
//   [key: string]: Operation
// }

export default class DriveAppController {
  readonly #api: DriveOperations;
  public readonly loadDir: ObservableDelegate<DriveOperations["list"]>;
  public readonly delete: ObservableDelegate<DriveOperations["delete"]>;
  public readonly upload: ObservableDelegate<DriveOperations["upload"]>;
  public readonly download: ObservableDelegate<DriveOperations["download"]>;

  constructor(api: DriveOperations) {
    this.#api = api;
    this.loadDir = createObservableDelegate(this.#api.list);
    this.delete = createObservableDelegate(this.#api.delete);
    this.download = createObservableDelegate(this.#api.download);
    this.upload = createObservableDelegate(this.#api.upload);
  }
  
}