'use client'
import { createTheme } from '@mui/material';


export const theme = createTheme({
  palette: {
    primary: {
      main: "#3498db",
    },
    secondary: {
      main: "#2ecc71",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          padding: "8px 24px",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
  typography: {
    body1: {
      color: "#111111",
    },
  },
});
theme.shadows[1]="0px 5px 22px lightgray"


