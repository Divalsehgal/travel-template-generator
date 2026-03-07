import { createTheme } from '@mui/material/styles';
import * as tokens from '@shiv-bhoomi/design-tokens';

export const muiTheme = createTheme({
    typography: {
        fontFamily: tokens.FontFamilyBody,
        fontSize: 16,
        h1: { fontFamily: tokens.FontFamilyDisplay },
        h2: { fontFamily: tokens.FontFamilyDisplay },
        h3: { fontFamily: tokens.FontFamilyDisplay },
        h4: { fontFamily: tokens.FontFamilyDisplay },
        h5: { fontFamily: tokens.FontFamilyDisplay },
        h6: { fontFamily: tokens.FontFamilyDisplay },
    },
    palette: {
        primary: {
            main: tokens.ColorPrimary,
            light: tokens.ColorPrimaryLight,
            dark: tokens.ColorPrimaryDark,
        },
        error: {
            main: tokens.ColorError,
            light: tokens.ColorErrorLight,
            dark: tokens.ColorErrorDark,
        },
        success: {
            main: tokens.ColorSuccess,
            light: tokens.ColorSuccessLight,
            dark: tokens.ColorSuccessDark,
        },
        text: {
            primary: tokens.ColorStoneGray,
            secondary: tokens.ColorStoneGrayLight,
        },
        background: {
            default: tokens.ColorBgOffWhite,
            paper: tokens.ColorWhite,
        },
    },
    shape: {
        borderRadius: 8, // Roughly equivalent to tokens.BorderRadiusDefault (0.5rem)
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: tokens.ColorWhite,
                    '& fieldset': {
                        borderColor: tokens.ColorGray300,
                        borderWidth: tokens.BorderWidthThin,
                    },
                    '&:hover fieldset': {
                        borderColor: tokens.ColorPrimaryLight,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: tokens.ColorPrimary,
                        borderWidth: '2px', // Matches your focus border specific width
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: tokens.ColorStoneGray,
                    fontFamily: tokens.FontFamilyBody,
                    '&.Mui-focused': {
                        color: tokens.ColorPrimary,
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    paddingTop: tokens.Spacing3,
                    paddingBottom: tokens.Spacing3,
                }
            }
        }
    },
});
