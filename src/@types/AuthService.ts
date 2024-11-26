export interface AuthService {
  loggedIn: boolean;
  doLogin: () => void;
  doLogout: () => void;
}
