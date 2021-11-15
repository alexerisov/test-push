import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

export const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: `"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif`,
      // fontSize: 16,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500
    },
    palette: {
      primary: {
        main: '#FFAA00',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
        contrastText: '#fff'
      },
      secondary: {
        main: '#1B1B1B',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
        contrastText: '#fff'
      },
      info: {
        main: '#1672EC',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
        contrastText: '#fff'
      },
      success: {
        main: '#47D85D',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
        contrastText: '#fff'
      },
      error: {
        main: '#f44336',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
        contrastText: '#fff'
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      tonalOffset: 0.05
    }
  })
);
