import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { Button } from "@mui/material";
import { useButtonState } from "../model/contexts/UiStateContext";

export default function LogoutButton() {
  const state = useButtonState("logout");
  return <Button variant="outlined" color="primary" endIcon={<LogoutTwoToneIcon />} disabled={state.disabled}>Logout</Button>;
};