import Main from "../layouts/main.jsx";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
const Home = () => {
   const navigate = useNavigate();
   const refreshToken = Cookies.get("refreshToken");
   const accessToken = Cookies.get("accessToken");
   console.log("refreshToken", refreshToken);
   console.log("accessToken", accessToken);
   if (!refreshToken && !accessToken) {
      console.log("navigate to login");
      navigate("/login");
      return null;
   } else {
      return <Main />;
   }
};

export default Home;
