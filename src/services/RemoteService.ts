import ApiService from "./ApiService";
import AuthService from "./AuthService";

export default interface RemoteService {
  auth: AuthService,
  api: ApiService,
}