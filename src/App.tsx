import { useColorScheme } from "@mui/material/styles";
import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import useGoogleAuth from "./hooks/GoogleAuth";
import useGoogleDrive from "./hooks/GoogleDrive";
import { RichTreeView } from "@mui/x-tree-view";
import { useEffect } from "react";

function App() {
  const { mode } = useColorScheme();
  const [loggedIn, login, logout] = useGoogleAuth();
  const [contents, refreshContents, resetContents] = useGoogleDrive();

  useEffect(() => {
    if (loggedIn) {
      console.log("refreshing!");
      refreshContents();
    } else {
      console.log("resetting");
      resetContents();
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

