import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ThemeProvider, createTheme, CssBaseline} from "@mui/material";
import {Provider} from "react-redux";
import store from "./redux/store";


const theme = createTheme({
    palette: {
        primary: {
            main: '#AD9FFF',
        },
        secondary: {
            main: '#644DED'
        },
        success: {
            main: '#AD9FFF',
        }
    },
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                input: {
                    color: '#242533',
                },
                clearIndicator: {
                    color: '#242533',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#242533',
                },
            },
        },
    },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>
);
