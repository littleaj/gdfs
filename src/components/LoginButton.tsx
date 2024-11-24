import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import { Button } from "@mui/material";
import { useButtonState } from "../model/contexts/UiStateContext";
import { useContext } from "react";
import { ApplciationCommands } from "../hooks/ApplicationCommands";

export default function LoginButton() {
  const state = useButtonState("login");
  const commands = useContext(ApplciationCommands);

  function doLogin() {
    console.log("Attempting login...");
    commands.login();
  }

  return <Button onClick={doLogin} variant="contained" color="primary" endIcon={<LoginTwoToneIcon />} disabled={state.disabled}>Login</Button>;
};