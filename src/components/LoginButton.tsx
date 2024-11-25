import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import Button from "@mui/material/Button";
import { AuthButtonProps } from "./types";


export default function LoginButton({ onClick, disabled }: AuthButtonProps) {

  return <Button 
    onClick={onClick} 
    variant="contained"
    color="primary"
    endIcon={<LoginTwoToneIcon />}
    disabled={disabled}>Login</Button>;
};