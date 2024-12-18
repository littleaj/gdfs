import { useColorScheme } from "@mui/material/styles";
import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import useGoogleAuth from "./hooks/UseGoogleAuth";
import useGoogleDrive from "./hooks/UseGoogleDrive";
import { RichTreeView } from "@mui/x-tree-view";
import { useEffect } from "react";

function App() {
  const { mode } = useColorScheme();
  const { loggedIn, doLogin: login, doLogout: logout } = useGoogleAuth();
  const { driveContents: contents, refreshContents, resetContents } = useGoogleDrive();

  useEffect(() => {
    if (loggedIn) {
      console.log("resetting...");
      resetContents();
      console.log("refreshing!");
      refreshContents();
    }
  }, [loggedIn, refreshContents, resetContents]);

  if (!mode) {
    return null;
  }

  return (
    <>
      <header>
        <h1>GDFS</h1>
      </header>
      <Card variant="outlined">
        <CardActions>
          <LoginButton onClick={login} disabled={loggedIn} />
          <LogoutButton onClick={logout} disabled={!loggedIn} />
        </CardActions>
        <CardContent>

          <Card variant="elevation">
            <CardContent>
              <Typography>This is where files go...</Typography>
              <RichTreeView items={contents.map(f => ({ ...f, label: f.name }))} />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
}

export default App;

