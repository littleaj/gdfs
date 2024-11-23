import { ObservableFacade } from "../model/ObservableDelegate";
import { OperationResult } from "../model/Operation";

export interface AuthService {
  loggedIn: boolean;
  login(): OperationResult;
  logout(): OperationResult;
}

// FIXME remove this coupling
export type ObservableAuthManager = ObservableFacade<AuthService>;