import React from "react";
import {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import ReactQuill from "react-quill";
import axiosInstance from "../../apis";
import "react-quill/dist/quill.snow.css";
import dayjs from "dayjs";
import {ToastContainer, toast, Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 1000,
   bgcolor: "#3C4253",
   p: 4,
   borderRadius: "10px",
   boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
};

function ResponsiveAppBar() {
   const [valueDate, setValueDate] = useState({
      startDate: dayjs(),
      endDate: dayjs(),
   });
   const [value, setValue] = useState({title: "", body: ""});
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   // Handle input change
   const handleChange = (e) => {
      const {name, value} = e.target;
      setValue((prevValue) => ({...prevValue, [name]: value}));
   };

   const handleDateChange = (newValue, fieldName) => {
      setValueDate((prevValue) => ({
         ...prevValue,
         [fieldName]: newValue, // Cập nhật giá trị startDate hoặc endDate
      }));
   };
   const filterQuetion = async () => {
      if (valueDate.startDate === "" || valueDate.endDate === "") {
         const notify = () =>
            toast.warn("Vui lòng điền đầy đủ thông tin ngày bắt đầu và ngày kết thúc !", {
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
         notify();
         return;
      }
      if (new Date(valueDate.startDate) > new Date(valueDate.endDate)) {
         const notify = () =>
            toast.warn("Ngày bắt đầu không được lớn hơn ngày kết thúc !", {
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
         notify();
         return;
      }
      try {
         const response = await axiosInstance.get("/questions/filter-by-date", {
            params: {startDate: valueDate.startDate, endDate: valueDate.endDate},
         });
         if (response.status === 200 || response.status === 201) {
            const notify = () =>
               toast.success("Lọc câu hỏi thành công !", {
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
            notify();
         }
      } catch (error) {
         const notify = () =>
            toast.error("Lọc câu hỏi thất bại !" + error, {
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
         notify();
      }
   };

   // Handle ReactQuill change
   const handleQuillChange = (content) => {
      setValue((prevValue) => ({...prevValue, body: content}));
   };
   const handleSubmit = async () => {
      try {
         if (value.title === "" || value.body === "") {
            const notify = () =>
               toast.warn("Vui lòng điền đầy đủ thông tin câu hỏi !", {
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
            notify();
            return;
         }
         const response = await axiosInstance.post("/questions/create", {
            title: value.title.toString(),
            content: value.body.toString(),
         });

         if (response.status === 201) {
            const notify = () =>
               toast.success("Thêm thành công câu hỏi của bạn !", {
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
            notify();
            window.location.reload();
         }
      } catch (error) {
         const notify = () =>
            toast.error("Thêm thất bại !" + error, {
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
         notify();
      }
      handleClose();
   };
   return (
      <>
         <AppBar
            position='sticky'
            sx={{
               top: "110px",
               backgroundColor: "#292F42",
               color: "white",
               width: "98%",
               margin: "0 auto",
               borderRadius: "10px",
            }}>
            <Container
               maxWidth='xl'
               sx={{
                  height: "85px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  padding: "0px",
                  margin: "0px",
                  borderRadius: "10px",
               }}>
               <Toolbar>
                  <Box
                     sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        alignItems: "center",
                        gap: "10px",
                     }}>
                     <Button
                        onClick={handleOpen}
                        variant='contained'
                        startIcon={<AddCircleOutlineIcon sx={{fontSize: 30}} />}
                        sx={{
                           borderRadius: "5px",
                           padding: "5px 10px",
                           height: "56px ",
                           backgroundColor: "#F24237",
                        }}>
                        Add new Questions
                     </Button>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                           label='Ngày bắt đầu'
                           value={valueDate.startDate}
                           onChange={(newValue) => handleDateChange(newValue, "startDate")}
                           renderInput={(params) => <TextField {...params} />}
                        />
                     </LocalizationProvider>
                     <KeyboardDoubleArrowRightIcon />
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                           label='Ngày kết thúc'
                           value={valueDate.endDate}
                           inputFormat='YYYY-MM-DD hh:mm A' // Định dạng hiển thị
                           onChange={(newValue) => handleDateChange(newValue, "endDate")}
                           renderInput={(params) => <TextField {...params} />}
                        />
                     </LocalizationProvider>
                     <Button
                        onClick={() => filterQuetion()}
                        variant='outlined'
                        startIcon={<FilterAltIcon sx={{fontSize: 30}} />}
                        sx={{
                           borderRadius: "5px",
                           padding: "5px 10px",
                           height: "56px ",
                        }}>
                        Filter Questions
                     </Button>
                  </Box>
               </Toolbar>
            </Container>
         </AppBar>
         <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            sx={{color: "white", overflowX: "scroll"}}
            aria-labelledby='keep-mounted-modal-title'
            aria-describedby='keep-mounted-modal-description'>
            <Box sx={style}>
               <Typography id='keep-mounted-modal-title' variant='h6' component='h2' sx={{textAlign: "center"}}>
                  Bạn muốn thêm câu hỏi mới cho nhà tuyển dụng?
               </Typography>
               <Typography id='keep-mounted-modal-description' sx={{mt: 2}}>
                  Bạn hãy điền thông tin câu hỏi mới vào form dưới đây nhé!
               </Typography>
               <FormControl sx={{marginTop: "20px", width: "100%"}}>
                  <FormLabel>Tiêu đề câu hỏi</FormLabel>
                  <Input placeholder='Type in here…' name='title' value={value.title} onChange={handleChange} />
               </FormControl>
               <FormControl sx={{marginTop: "20px", width: "100%"}}>
                  <FormLabel sx={{marginTop: "20px"}}>Nội dung câu hỏi</FormLabel>
                  <ReactQuill
                     value={value.body}
                     onChange={handleQuillChange}
                     style={{color: "black", backgroundColor: "white", borderRadius: "10px", border: "none"}}
                  />
               </FormControl>
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     gap: "10px",
                     marginTop: "20px",
                  }}>
                  <Button
                     onClick={() => handleSubmit()}
                     variant='contained'
                     sx={{marginTop: "20px", backgroundColor: "#F24237", color: "white", borderRadius: "10px"}}>
                     Add new Questions
                  </Button>
                  <Button
                     onClick={handleClose}
                     variant='outlined'
                     sx={{marginTop: "20px", outline: "#F24237", color: "white", borderRadius: "10px"}}>
                     Cancel
                  </Button>
               </Box>
            </Box>
         </Modal>
      </>
   );
}
export default ResponsiveAppBar;
