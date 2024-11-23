import { ObservableFacade } from "../model/ObservableDelegate";
import { OperationResult } from "../model/Operation";

export interface AuthManager {
  loggedIn: boolean;
  login(): OperationResult;
  logout(): OperationResult;
}

export type ObservableAuthManager = ObservableFacade<AuthManager>;