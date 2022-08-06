import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";

import App from "app";
import { globalStyles } from "app/styles";
import { theme } from "app/theme";

import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { store } from "redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("app-root") as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      {globalStyles}
      <StoreProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreProvider>
    </StyledEngineProvider>
  </ThemeProvider>
);
