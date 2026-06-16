import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
    palette: {
        mode: "dark",

        primary: {
        main: "#00d4ff",
        dark: "#2f81f7",
        contrastText: "#06111f",
        },

        secondary: {
        main: "#2f81f7",
        },

        background: {
        default: "#07111f",
        paper: "#101d33",
        },

        text: {
        primary: "#e6edf3",
        secondary: "#8b949e",
        },

        error: {
        main: "#ff5c7a",
        },

        success: {
        main: "#2ecc71",
        },
    },

    shape: {
        borderRadius: 14,
    },

    typography: {
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
        button: {
        textTransform: "none",
        fontWeight: 800,
        },
    },

    components: {
        MuiButton: {
        styleOverrides: {
            root: {
            borderRadius: "999px",
            minHeight: "40px",
            fontWeight: 800,
            },
        },
        },

        MuiTextField: {
        defaultProps: {
            variant: "outlined",
            size: "small",
        },
        },

        MuiOutlinedInput: {
        styleOverrides: {
            root: {
            borderRadius: "999px",
            backgroundColor: "#0b1628",
            },
        },
        },

        MuiCard: {
        styleOverrides: {
            root: {
            backgroundImage: "none",
            backgroundColor: "rgba(16, 29, 51, 0.72)",
            border: "1px solid #22314d",
            borderRadius: "22px",
            },
        },
        },

        MuiChip: {
        styleOverrides: {
            root: {
            fontWeight: 800,
            },
        },
        },
    },
});