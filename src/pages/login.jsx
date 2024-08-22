import React, {useState} from "react";
import {
   Button,
   Card,
   CardContent,
   CardHeader,
   TextField,
   Typography,
   IconButton,
   InputAdornment,
   Grid,
   Checkbox,
   FormControlLabel,
   Divider,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ToastContainer, toast, Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import validator from "validator";
import axiosInstance from "../apis";
import {useNavigate} from "react-router-dom";
function LoginPage() {
   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const handleLoginGoogle = async () => {};
   const handleLoginFacebook = async () => {};
   const handleLoginTwitter = async () => {};

   const handleLogin = async (event) => {
      event.preventDefault();
      if (!email || !password) {
         toast.warn("Email and password are required!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
         });
         return;
      }
      if (!validator.isEmail(email)) {
         toast.warn("Email is not in correct format!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
         });
         return;
      }
      if (password.length < 4) {
         toast.warn("Password must be at least 4 characters long!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
         });
         return;
      }
      try {
         const response = await axiosInstance.post("/users/login", {email, password});
         if (response.status === 200 || response.status === 201) {
            const {accessToken, refreshToken, user} = response.data;
            Cookies.set("accessToken", accessToken, {expires: 1});
            Cookies.set("refreshToken", refreshToken, {expires: 100});
            Cookies.set("user", JSON.stringify(user), {expires: 100});
            navigate("/");
            window.location.reload();
         } else {
            toast.error("Incorrect email or password!", {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark",
               transition: Bounce,
            });
         }
      } catch (error) {
         toast.error("Incorrect email or password!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
         });
      }
   };
   return (
      <div
         style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            backgroundColor: "#222636",
         }}>
         <Card
            style={{
               width: "1000px",
               height: "600px",
               backgroundColor: "#292F42",
               borderRadius: "30px",
            }}>
            <Grid container spacing={0} style={{height: "100%"}}>
               <Grid item xs={5}>
                  <img
                     src='https://images.unsplash.com/photo-1665789318391-6057c533005e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                     alt='Login Illustration'
                     style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                     }}
                  />
               </Grid>
               <Grid item xs={7}>
                  <div
                     style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        height: "100%",
                     }}>
                     <CardHeader
                        title='Login into account'
                        titleTypographyProps={{
                           variant: "overline",
                           align: "center",
                           // style: { color: "#1b4332" },
                           fontSize: "3vh",
                        }}
                     />
                     <CardContent>
                        <form onSubmit={handleLogin}>
                           <div style={{marginBottom: "20px"}}>
                              <TextField
                                 label='Email'
                                 name='email'
                                 fullWidth
                                 variant='outlined'
                                 placeholder='Email Address'
                                 InputProps={{
                                    style: {
                                       backgroundColor: "#778da9",
                                       borderRadius: "10px",
                                    },
                                 }}
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                              />
                           </div>

                           <div style={{marginBottom: "10px"}}>
                              <TextField
                                 label='Password'
                                 name='password'
                                 fullWidth
                                 variant='outlined'
                                 type={showPassword ? "text" : "password"}
                                 placeholder='Password'
                                 InputProps={{
                                    style: {
                                       backgroundColor: "#778da9",
                                       borderRadius: "10px",
                                    },
                                    endAdornment: (
                                       <InputAdornment position='end'>
                                          <IconButton
                                             onClick={handleClickShowPassword}
                                             onMouseDown={handleMouseDownPassword}>
                                             {showPassword ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                       </InputAdornment>
                                    ),
                                 }}
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                              />
                           </div>
                           <Button
                              type='submit'
                              variant='contained'
                              fullWidth
                              style={{
                                 marginBottom: "10px",
                                 backgroundColor: "#1b263b",
                                 color: "#fff",
                                 borderRadius: "10px",
                                 minHeight: "40px",
                                 marginTop: "10px",
                              }}>
                              Login
                           </Button>

                           <Typography
                              variant='body2'
                              align='right'
                              style={{
                                 marginTop: "10px",
                                 fontSize: "16px",
                              }}>
                              <a href='/forgot-password' style={{textDecoration: "none", color: "#007bff"}}>
                                 Forgot Password?
                              </a>
                           </Typography>

                           <Typography
                              variant='overline'
                              display='flex'
                              justifyContent='center'
                              style={{
                                 margin: "10px 0",
                                 fontSize: "10px",
                              }}>
                              or login with
                           </Typography>

                           <div
                              style={{
                                 display: "flex",
                                 justifyContent: "space-between",
                                 marginBottom: "20px",
                              }}>
                              <Button
                                 variant='contained'
                                 style={{
                                    backgroundColor: "#4267B2",
                                    color: "#fff",
                                    flex: 1,
                                    marginRight: "10px",
                                 }}
                                 onClick={handleLoginFacebook}>
                                 Facebook
                              </Button>

                              <Button
                                 variant='contained'
                                 style={{
                                    backgroundColor: "#DB4437",
                                    color: "#fff",
                                    flex: 1,
                                    marginRight: "10px",
                                 }}
                                 onClick={handleLoginGoogle}>
                                 Google
                              </Button>

                              <Button
                                 variant='contained'
                                 style={{
                                    backgroundColor: "#1DA1F2",
                                    color: "#fff",
                                    flex: 1,
                                 }}
                                 onClick={handleLoginTwitter}>
                                 Twitter
                              </Button>
                           </div>
                           <Divider style={{margin: "20px 0"}} />
                           <Typography variant='body2' align='center' style={{fontSize: "16px"}}>
                              Don’t have an account?{" "}
                              <a href='/register' style={{textDecoration: "none", color: "#007bff"}}>
                                 Register here
                              </a>
                           </Typography>
                        </form>
                     </CardContent>
                  </div>
               </Grid>
            </Grid>
         </Card>
      </div>
   );
}

export default LoginPage;
