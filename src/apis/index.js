import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
   baseURL: "http://localhost:8899/api/v1",
});

// Hàm để làm mới access token
const refreshAccessToken = async () => {
   try {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) throw new Error("No refresh token found");
      const response = await axiosInstance.post("/token/refresh-token", {
         refresh_token: refreshToken,
      });
      const newAccessToken = response.data.accessToken;
      // Lưu trữ access token mới trong cookie
      Cookies.set("accessToken", newAccessToken, {secure: true, sameSite: "Strict", expires: 1});
      return newAccessToken;
   } catch (error) {
      console.error("Unable to refresh access token.", error);
      return null;
   }
};

axiosInstance.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 419 && !originalRequest._retry) {
         originalRequest._retry = true;
         const newAccessToken = await refreshAccessToken();
         if (newAccessToken) {
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
         }
      }
      return Promise.reject(error);
   }
);

axiosInstance.interceptors.request.use(
   (config) => {
      const token = Cookies.get("accessToken");
      if (token) {
         config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
   },
   (error) => Promise.reject(error)
);

export default axiosInstance;
