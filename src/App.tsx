import "./App.css";
import GoogleAuthConfig from "./model/GoogleAuthConfig";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import useGoogleAuth from "./hooks/GoogleAuth";

function App() {
  const [loggedIn, doLogin, doLogout ] = useGoogleAuth();
  return (
    <>
      <header>
        <h1>GDFS</h1>
      </header>
      <Card variant="outlined">
        <CardContent>
          <Typography>This is where files go...</Typography>
          
        </CardContent>
        <CardActions>
          <LoginButton onClick={handleAuthClick} disabled={loggedIn} />
          <LogoutButton onClick={handleSignoutClick} disabled={!loggedIn} />
        </CardActions>
      </Card>
    </>
  );
}

export default App;

