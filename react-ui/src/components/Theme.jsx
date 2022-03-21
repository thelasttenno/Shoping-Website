import { createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#FF9800',
    },
    secondary: {
      main: '#0066ff',
    },
    error: {
      main: '#ff1900',
    },
    warning: {
      main: '#e5ff00',
    },
    background: {
      default: 'rgba(0, 0, 0, 0.87)',
      paper: 'rgba(0, 0, 0, 0.87)',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(255,255,255,0.54)',
      disabled: 'rgba(255,255,255,0.38)',
      hint: 'rgba(255,255,255,0.38)',
    },
    info: {
      main: '#00ff99',
    },
    success: {
      main: '#66ff00',
    },
  },
};