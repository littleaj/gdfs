export default interface OperationResult<T = void> {
  success: boolean;
  message?: string;
  data?: T extends void ? undefined : () => Promise<T>;
}