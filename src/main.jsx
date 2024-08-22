import {createRoot} from "react-dom/client";
import theme from "./utils/theme.js";
import {Experimental_CssVarsProvider as CssVarsProvider} from "@mui/material/styles";
import App from "./App.jsx";
import "./styles/index.scss";

createRoot(document.getElementById("__next")).render(
   <CssVarsProvider theme={theme} defaultMode='dark'>
      <App />
   </CssVarsProvider>
);
