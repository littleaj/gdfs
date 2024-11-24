import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import { Button } from "@mui/material";
import { useButtonState } from "../model/contexts/UiStateContext";






export default function LoginButton() {
  const state = useButtonState("login");
  return <Button variant="contained" color="primary" endIcon={<LoginTwoToneIcon />} disabled={state.disabled}>Login</Button>;
};