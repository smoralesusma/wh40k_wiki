"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#002f34",
      light: "#004d40",
      dark: "#003b2c",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#fbc02d",
      light: "#fdd835",
      dark: "#f9a825",
      contrastText: "#000000",
    },
    background: {
      default: "#e0f2f1",
      paper: "#ffffff"
    },
    text: {
      primary: "#ffffff",
      secondary: "#d3d3d3",
    },
    error: {
      main: "#d32f2f",
      light: "#f44336",
      dark: "#b71c1c",
      contrastText: "#ffffff",
    },
    success: {
      main: "#388e3c",
      light: "#4caf50",
      dark: "#2c6e2f",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f57f17",
      light: "#ffb300",
      dark: "#ff6f00",
      contrastText: "#000000",
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
      contrastText: "#ffffff",
    }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  }
});

export default theme;
