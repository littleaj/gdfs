import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import Button from "@mui/material/Button";
import { AuthButtonProps } from "./components";


export default function LogoutButton({onClick, disabled}: AuthButtonProps) {
  return <Button 
    onClick={onClick} 
    variant="outlined" 
    color="primary" 
    endIcon={<LogoutTwoToneIcon />} 
    disabled={disabled}>Logout</Button>;
};