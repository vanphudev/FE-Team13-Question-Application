import React, {useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {Box} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {ToastContainer, toast, Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../apis";
import Modal from "@mui/material/Modal";
import ReactQuill from "react-quill";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction='up' ref={ref} {...props} />;
});
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

const FullScreenDialog = ({isOpen, onClose, listAnswers, setListAnswers}) => {
   if (!isOpen) {
      return null;
   }

   const [openupdate, setOpenUpdate] = useState(false);
   const [openDelete, setOpenDelete] = useState(false);
   const [valueDelete, setValueDelete] = useState({
      text: "",
      id: "",
   });

   const [value, setValue] = useState({
      text: "",
      id: "",
   });

   const handleCloseUpdate = () => {
      setOpenUpdate(false);
      setValue({text: ""});
   };

   const handleEditAnswer = (Answers) => {
      setValue({text: Answers.answer_content});
      setOpenUpdate(true);
   };

   const handleQuillChange = (content) => {
      setValue((prevValue) => ({...prevValue, text: content}));
   };

   const handleDeleteAnswer = (Answer) => {
      setValueDelete({text: Answer.answer_content, id: Answer.answer_id});
      setOpenDelete(true);
   };

   const handleCloseDelete = () => {
      setValueDelete({text: "", id: ""});
      setOpenDelete(false);
   };

   const handleDelete = async (id) => {
      try {
         const response = await axiosInstance.delete(`/answers/delete/${id}`);
         if (response.status === 200 || response.status === 2001) {
            toast.success("Xóa câu trả lời thành công !", {
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
            setOpenDelete(false);
            setListAnswers((prev) => {
               return {
                  ...prev,
                  answers: prev.answers.filter((answer) => answer.answer_id !== id),
                  totalAnswers: prev.totalAnswers - 1,
               };
            });
         }
      } catch (err) {
         toast.error("Xóa câu trả lời không thành công !", {
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

   const handleSubmitUpdate = async (Answers) => {
      try {
         if (!value.text) {
            toast.warn("Nội dung không được trống " + errorMessage, {
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
         const response = await axiosInstance.put(`/answers/update/${Answers.answer_id}`, {
            content: value.text,
         });
         if (response.status === 200 || response.status === 2001) {
            toast.success("Cập nhật nội dung thành công ! " + errorMessage, {
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
      } catch (err) {
         toast.success("Cập nhật không thành công ! " + errorMessage, {
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
      <>
         <React.Fragment>
            <Dialog
               open={openDelete}
               onClose={handleCloseDelete}
               aria-labelledby='alert-dialog-title'
               aria-describedby='alert-dialog-description'>
               <DialogTitle id='alert-dialog-title'>Bạn có chắc chắn muốn xóa câu trả lời này không?</DialogTitle>
               <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                     Nội dung câu trả lời: {valueDelete?.text}
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleCloseDelete}>Disagree</Button>
                  <Button onClick={() => handleDelete(valueDelete.id)} sx={{color: "red"}}>
                     Agree
                  </Button>
               </DialogActions>
            </Dialog>
         </React.Fragment>
         <React.Fragment>
            <Modal
               keepMounted
               open={openupdate}
               onClose={handleCloseUpdate}
               sx={{color: "white", overflowX: "scroll"}}
               aria-labelledby='keep-mounted-modal-title'
               aria-describedby='keep-mounted-modal-description'>
               <Box sx={style}>
                  <Typography id='keep-mounted-modal-title' variant='h6' component='h2' sx={{textAlign: "center"}}>
                     Bạn muốn chỉnh sửa câu trả lời này ?
                  </Typography>
                  <FormControl sx={{marginTop: "20px", width: "100%"}}>
                     <FormLabel sx={{marginTop: "20px", marginBottom: "15px"}}>Nội dung câu trả lời:</FormLabel>
                     <ReactQuill
                        onChange={handleQuillChange}
                        value={value.body}
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
                        onClick={() => handleSubmitUpdate()}
                        variant='contained'
                        sx={{marginTop: "20px", backgroundColor: "#F24237", color: "white", borderRadius: "10px"}}>
                        Update Answer
                     </Button>
                     <Button
                        onClick={handleCloseUpdate}
                        variant='outlined'
                        sx={{marginTop: "20px", outline: "#F24237", color: "white", borderRadius: "10px"}}>
                        Cancel
                     </Button>
                  </Box>
               </Box>
            </Modal>
         </React.Fragment>
         <React.Fragment>
            <Dialog
               fullScreen
               open={isOpen}
               onClose={onClose}
               TransitionComponent={Transition}
               sx={{backgroundColor: "#383C49"}}>
               <AppBar sx={{position: "sticky", backgroundColor: "#232736", top: "0px"}}>
                  <Toolbar>
                     <Box sx={{flexGrow: 1, padding: "10px"}}>
                        <Box
                           sx={{
                              display: "flex",
                              padding: "10px",
                              flexWrap: "nowrap",
                              alignItems: "center",
                              gap: "10px",
                           }}>
                           <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' sx={{width: 56, height: 56}} />
                           <Typography sx={{ml: 2, flex: 1}} variant='h6' component='div'>
                              UserName: {listAnswers.question.creator.user_name}
                              <br />
                              Email: {listAnswers.question.creator.user_email}
                           </Typography>
                        </Box>
                        <Box
                           sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignContent: "center",
                              gap: "5px",
                           }}>
                           <Typography sx={{ml: 2, flex: 1}} variant='h6' component='div'>
                              Question: {listAnswers.question.question_title}
                           </Typography>
                           <Typography sx={{ml: 2, flex: 1}} variant='h6' component='div'>
                              {listAnswers.question.question_description}
                           </Typography>
                           <Typography sx={{ml: 2, flex: 1, color: "red"}} variant='h6' component='div'>
                              Có tất cả {listAnswers.totalAnswers} câu trả lời.
                           </Typography>
                        </Box>
                     </Box>
                     <IconButton edge='start' color='inherit' onClick={onClose} aria-label='close'>
                        <CloseIcon />
                     </IconButton>
                  </Toolbar>
               </AppBar>
               <List sx={{backgroundColor: "#383C49", height: "100vh"}}>
                  {listAnswers.answers.map((answer, index) => (
                     <React.Fragment key={index}>
                        <ListItemButton>
                           <ListItemText
                              primary={"Admin: " + answer.responder.user_name}
                              secondary={"Nội dung: " + answer.answer_content}
                           />
                           <Button sx={{color: "green"}} onClick={() => handleEditAnswer(answer)}>
                              <ModeEditIcon />
                           </Button>
                           <Button sx={{color: "#F24237"}} onClick={() => handleDeleteAnswer(answer)}>
                              <DeleteOutlineIcon />
                           </Button>
                        </ListItemButton>
                     </React.Fragment>
                  ))}
               </List>
            </Dialog>
         </React.Fragment>
      </>
   );
};

export default FullScreenDialog;
