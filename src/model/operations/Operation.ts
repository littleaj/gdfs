import { PlainFunction } from "../UtilityTypes";

// export type OperationStatus<DataType = void> =
//     DataType extends void ?
//     SuccessfulActionStatus | ErrorStatus :
//     SuccessfulTaskStatus<DataType> | ErrorStatus;

// export type ErrorStatus = { success: false, message: string };
// export type SuccessfulActionStatus = { success: true };
// export type SuccessfulTaskStatus<R> = { success: true, result?: R };

export interface OperationResponse<R = void> {
  success: boolean,
  message?: string,
  data?: R,
}

export type Operation<P extends any[] = any[], R = any> = PlainFunction<P, R>;