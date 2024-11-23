import { createObservableDelegate, ObservableOperation } from "../model/operations/Observable";
import { Operation } from "../model/operations/Operation";

type AppendedOperation<T extends object, K extends string, F extends Operation> = T & { [key in K]: F };
type AppControllerBuilder<T extends Record<string, ObservableOperation> = {}> = {
  withCommand<Cmd extends string, Op extends Operation>(name: Cmd, op: Op): AppControllerBuilder<AppendedOperation<T, Cmd, Op>>;
  create(): T;
}

export function buildAppController(): AppControllerBuilder {
  const result: Record<string, ObservableOperation> = {};
  const builder = {
    withCommand(name: string, op: Operation) {
      result[name] = createObservableDelegate(op);
      return builder;
    },
    create() {
      return result;
    }
  }
  return builder as AppControllerBuilder;
}


