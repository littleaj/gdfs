import { createObservableDelegate, ObservableOperation } from "../model/operations/Observable";
import { Operation } from "../model/operations/Operation";

type CommandDispatcherBuilder<CommandDispatcher extends Record<string, ObservableOperation> = {}> = {
  withCommand<CmdName extends string, Op extends Operation>(name: CmdName, op: Op)
    : CommandDispatcherBuilder<CommandDispatcher & { [K in CmdName]: ObservableOperation<Op> }>;
  get(): CommandDispatcher;
}

export function dispatcherBuilder(): CommandDispatcherBuilder {
  const dispatcher: Record<string, ObservableOperation> = {};
  const builder = {
    withCommand(name: string, op: Operation) {
      dispatcher[name] = createObservableDelegate(op);
      return builder;
    },
    get() {
      return dispatcher;
    }
  }

  return builder as CommandDispatcherBuilder;
}


