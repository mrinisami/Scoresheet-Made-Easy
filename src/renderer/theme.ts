import { createTheme, experimental_sx as sx } from '@mui/material/styles';

export const themeDefault = createTheme({});

export const themeDark = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const themeGreen = createTheme({
  typography: {
    allVariants: { color: '#F0F8FF' },
    button: { fontWeight: 'bold' },
  },

  palette: {
    background: {
      default: '#263238',
    },
    primary: { main: '#FFD700' },
    secondary: { main: '#b2ff59' },
    action: { selectedOpacity: 0.3 },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: { root: sx({ p: 1, borderRadius: 4, text: '#F0F8FF' }) },
    },
    MuiTableCell: { defaultProps: { align: 'center' } },
    MuiPaper: {
      defaultProps: { elevation: 20 },
      styleOverrides: { root: { background: '#607d8b' } },
    },
    MuiTextField: {
      styleOverrides: { root: sx({ input: { color: '#F0F8FF' } }) },
    },
  },
});

export const themeBlue = createTheme({
  typography: {
    allVariants: { color: '#000000' },
    button: { fontWeight: 'bold' },
  },

  palette: {
    background: {
      default: '#000080',
    },
    primary: { main: '#00BFFF' },
    secondary: { main: '#b2ff59' },
    action: { selectedOpacity: 0.3 },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: { root: sx({ p: 1, borderRadius: 4, text: '#000000' }) },
    },
    MuiTableCell: { defaultProps: { align: 'center' } },
    MuiPaper: {
      defaultProps: { elevation: 20 },
      styleOverrides: { root: { background: '#D3D3D3' } },
    },
    MuiTextField: {
      styleOverrides: { root: sx({ input: { color: '#000000' } }) },
    },
  },
});

export const themeBrown = createTheme({
  typography: {
    allVariants: { color: 'white' },
    button: { fontWeight: 'bold' },
  },

  palette: {
    background: {
      default: '#3e2723',
    },
    primary: { main: '#000080' },
    secondary: { main: '#b2ff59' },
    action: { selectedOpacity: 0.3 },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: { root: sx({ p: 1, borderRadius: 4, text: '#F0F8FF' }) },
    },
    MuiTableCell: { defaultProps: { align: 'center' } },
    MuiPaper: {
      defaultProps: { elevation: 20 },
      styleOverrides: { root: { background: '#795548' } },
    },
    MuiTextField: {
      styleOverrides: { root: sx({ input: { color: '#000000' } }) },
    },
  },
});

export const themeTeal = createTheme({
  typography: {
    allVariants: { color: 'white' },
    button: { fontWeight: 'bold' },
  },
  palette: {
    background: {
      default: '#004d40',
    },
    primary: { main: '#d84315' },
    secondary: { main: '#b2ff59' },
    action: { selectedOpacity: 0.3 },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: { root: sx({ p: 1, borderRadius: 4, text: '#F0F8FF' }) },
    },
    MuiTableCell: { defaultProps: { align: 'center' } },
    MuiPaper: {
      defaultProps: { elevation: 20 },
      styleOverrides: { root: { background: '#009688' } },
    },
    MuiTextField: {
      styleOverrides: { root: sx({ input: { color: '#000000' } }) },
    },
  },
});

export const themePink = createTheme({
  typography: {
    allVariants: { color: 'white' },
    button: { fontWeight: 'bold' },
  },

  palette: {
    background: {
      default: '#311b92',
    },
    primary: { main: '#ffee58' },
    secondary: { main: '#b2ff59' },
    action: { selectedOpacity: 0.3 },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: { root: sx({ p: 1, borderRadius: 4, text: '#F0F8FF' }) },
    },
    MuiTableCell: { defaultProps: { align: 'center' } },
    MuiPaper: {
      defaultProps: { elevation: 20 },
      styleOverrides: { root: { background: '#673ab7' } },
    },
    MuiTextField: {
      styleOverrides: { root: sx({ input: { color: '#000000' } }) },
    },
  },
});
