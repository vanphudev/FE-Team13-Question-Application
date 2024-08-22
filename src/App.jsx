import React from "react";
import "./styles/index.scss";
import {BrowserRouter} from "react-router-dom";
import RouterPublic from "./routes/publicRoute.jsx";
import Data from "./resources/data.js";
import Header from "./layouts/header.jsx";
import {SnackbarProvider} from "notistack";
import Footer from "./layouts/footer.jsx";
import MenuOption from "./layouts/menuOption.jsx";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
   document.title = Data.title;
   const refreshToken = Cookies.get("refreshToken");
   const accessToken = Cookies.get("accessToken");
   return (
      <SnackbarProvider anchorOrigin={{vertical: "top", horizontal: "right"}}>
         <ToastContainer />
         <BrowserRouter>
            <Header />
            {refreshToken && accessToken && <MenuOption />}
            <RouterPublic />
            <Footer />
         </BrowserRouter>
      </SnackbarProvider>
   );
};

export default App;
