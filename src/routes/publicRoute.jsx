import React from "react";
import Home from "../pages/home.jsx";
import LoginPage from "../pages/login.jsx";
import {Routes, Route} from "react-router-dom";
const RouterPublic = () => {
   return (
      <>
         <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
         </Routes>
      </>
   );
};

export default RouterPublic;
