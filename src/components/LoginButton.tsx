import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import { Button } from "@mui/material";

export default function LoginButton() {

  return <Button onClick={() => console.log("Login Clicked!")} variant="contained" color="primary" endIcon={<LoginTwoToneIcon />} disabled={true}>Login</Button>;
};