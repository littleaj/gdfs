import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import useGoogleAuth from "./hooks/GoogleAuth";
import useGoogleDrive from "./hooks/GoogleDrive";

function App() {
  const [loggedIn, doLogin, doLogout ] = useGoogleAuth();
  const [listFiles] = useGoogleDrive();
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
          <LoginButton onClick={doLogin} disabled={loggedIn} />
          <LogoutButton onClick={doLogout} disabled={!loggedIn} />
        </CardActions>
      </Card>
    </>
  );
}

export default App;

