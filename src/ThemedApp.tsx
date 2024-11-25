import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  }
});

export default function ThemedApp() {
  return <ThemeProvider theme={theme} defaultMode="system">
    <App />
  </ThemeProvider>;
} 