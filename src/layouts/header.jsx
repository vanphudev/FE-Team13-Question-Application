import React, {useState} from "react";
import "./header.scss";
import logo from "../assets/icons/logo-white.png";
import {AiOutlineSearch} from "react-icons/ai";
import SearchModal from "../components/SearchModel/SearchModal";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Logout} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
   const navigate = useNavigate();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const refreshToken = Cookies.get("refreshToken");
   const accessToken = Cookies.get("accessToken");
   const userCookie = Cookies.get("user");
   const user = userCookie ? JSON.parse(userCookie) : null;

   const handlerLogin = () => {
      const refreshToken = Cookies.get("refreshToken");
      const accessToken = Cookies.get("accessToken");
      if (refreshToken && accessToken) {
         navigate("/");
         window.location.reload();
         return;
      }
      navigate("/login");
   };

   const handlerLogout = () => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("user");
      navigate("/login");
      window.location.reload();
   };

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleCloseMenu = () => {
      setAnchorEl(null);
   };

   const [modalOpen, setModalOpen] = useState(false);
   const handleOpen = () => setModalOpen(true);
   const handleClose = () => setModalOpen(false);

   return (
      <header className='header' style={{marginBottom: "10px"}}>
         <div className='header_top_left'>
            <Link to='/'>
               <img src={logo} alt='logo' className='logo' />
            </Link>
         </div>
         <div className='header-center'>
            <ul>
               <li className='logo11'>Question Application</li>
            </ul>
         </div>
         <div className='searchheader'>
            <input type='text' placeholder='Search...' className='search-bar' onClick={handleOpen} />
            <AiOutlineSearch className='search-icon' onClick={handleOpen} /> {/* Thêm biểu tượng kính lúp */}
         </div>
         <div className='header-right'>
            <ul>
               <li>
                  <div className='login'>
                     {(!refreshToken || !accessToken) && (
                        <button onClick={handlerLogin} className='login-btn'>
                           Login
                        </button>
                     )}
                     {refreshToken && accessToken && (
                        <>
                           <Stack direction='row' spacing={2}>
                              <Tooltip>
                                 <>
                                    {" "}
                                    <IconButton
                                       onClick={handleClick}
                                       size='small'
                                       sx={{padding: 0}}
                                       aria-controls={open ? "basic-menu-profiles" : undefined}
                                       aria-haspopup='true'
                                       aria-expanded={open ? "true" : undefined}>
                                       <Avatar
                                          sx={{width: 44, height: 44, bgcolor: red[500]}}
                                          alt='Profile Picture'
                                          src='https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/275253747_1072102423713589_4612179048140960110_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFXLmledEki0IJrIZG56lUYLlgfC2oNXtAuWB8Lag1e0BhIdURdF0Zv82HzYLgFvxkhgEvpEyBM9xONwlzGv4Bt&_nc_ohc=0DftG3g4P1cQ7kNvgEMKrQf&_nc_ht=scontent.fsgn5-10.fna&gid=Aa1Pn0UNWd6eVdf26MOitd0&oh=00_AYCCztGFbKHBdYH1-dF1rcINGqrAMjYA_JCKD4mFuBhdGw&oe=668CCA96'
                                       />
                                    </IconButton>
                                    <Menu
                                       id='basic-menu-profiles'
                                       anchorEl={anchorEl}
                                       open={open}
                                       onClose={handleCloseMenu}
                                       MenuListProps={{
                                          "aria-labelledby": "basic-button-profiles",
                                       }}>
                                       <MenuItem>
                                          <Avatar sx={{width: 28, height: 28, mr: 2}} />
                                          Hi, {user?.user_name}
                                       </MenuItem>
                                       <Divider />
                                       <MenuItem onClick={handlerLogout}>
                                          <ListItemIcon>
                                             <Logout fontSize='small' />
                                          </ListItemIcon>
                                          Logout
                                       </MenuItem>
                                    </Menu>
                                 </>
                              </Tooltip>
                           </Stack>
                           <Typography sx={{marginLeft: "10px"}}>
                              <span style={{color: "white", fontWeight: "bold"}}>Hi, </span>
                              <span style={{color: "white", fontWeight: "bold"}}>{user?.user_name}</span>
                           </Typography>
                        </>
                     )}
                  </div>
               </li>
            </ul>
         </div>
         <SearchModal open={modalOpen} handleClose={handleClose} />
      </header>
   );
};

export default Header;
