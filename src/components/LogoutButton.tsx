import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { Button } from "@mui/material";

export default function LogoutButton() {
  return <Button onClick={() => console.log("Logout Clicked!")} variant="outlined" color="primary" endIcon={<LogoutTwoToneIcon />} disabled={true}>Logout</Button>;
};