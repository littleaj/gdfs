
export type ErrorResult = { success: false, message: string };
export type OperationResult<DataType = void> =
  ErrorResult | (
    DataType extends void ?
    { success: true } :
    { success: true, data: () => Promise<DataType> }
  );

export type Operation = Task<any> | Action;
export type Task<DataType> = (...args: any[]) => OperationResult<DataType>;
export type Action = (...args: any[]) => OperationResult;
