import { DefinedFunction, Maybe, TotalFunction } from "../UtilityTypes";

export type ErrorResult = { success: false, message: string };
export type OperationStatus<DataType = void> =
  ErrorResult | (
    DataType extends void ?
    { success: true } :
    { success: true, result: () => Promise<DataType> }
  );

/**
 * Should only return undefined on an error.
*/
export type Task<P extends any[] = any[], R = any> = R extends void ? never : DefinedFunction<P, Maybe<R>>;

/**
 * Returns true on success, false on error.
 */
export type Action<P extends any[] = any[]> = TotalFunction<P, boolean>;

// export type Operation<P extends any[] = any[], R = void> = R extends void ? Action<P> : Task<P, R>;
export type Operation<P extends any[] = any[], R = any> = R extends void ? Action<P> : Task<P, R>;