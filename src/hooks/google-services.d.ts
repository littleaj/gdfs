export interface GoogleAuthService {
  loggedIn: boolean;
  doLogin: () => void;
  doLogout: () => void;
}
