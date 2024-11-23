import { createObservableDelegate, ObservableOperation } from "../model/operations/Observable";
import { Operation } from "../model/operations/Operation";

type AppendedCommand<T extends object, K extends string, F extends Operation> = T & { [key in K]: F };
type CommandDispatchBuilder<T extends Record<string, ObservableOperation> = {}> = {
  withCommand<Cmd extends string, Op extends Operation>(name: Cmd, op: Op): CommandDispatchBuilder<AppendedCommand<T, Cmd, Op>>;
  create(): T;
}

export function buildCommandDispatch(): CommandDispatchBuilder {
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
  return builder as CommandDispatchBuilder;
}


