import * as React from "react";
import {useState} from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import "../../styles/CardQuestion/card.scss";
import TextTruncate from "react-text-truncate";
import QuickreplyIcon from "@mui/icons-material/Quickreply";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {useTheme} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {formatDateString, isValidDate} from "../../utils/func";
import axiosInstance from "../../apis";
import {ToastContainer, toast, Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {FormControl, FormLabel, Input} from "@mui/material";
import ReactQuill from "react-quill";
import Slide from "@mui/material/Slide";
import FullScreenDialog from "./ModalShowAllAnswer";
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

const CardQuestion = ({card, size, setListQuestions}) => {
   const widthCard = size.width / size.size;
   const widthCard_new = widthCard - 10;
   const [value, setValue] = useState({title: "", body: "", question_id: ""});
   const [reply, setReply] = useState({text: ""});
   const [openDelete, setOpenDelete] = useState(false);
   const [openReply, setOpenReply] = useState(false);
   const [openupdate, setOpenUpdate] = useState(false);
   const [listAnswers, setListAnswers] = useState([]);
   const [openAll, setOpenAll] = React.useState(false);
   const handleClickOpenAll = async (questionId) => {
      try {
         const respone = await axiosInstance.get(`/answers/get-answer/${questionId}`);
         if (respone.status === 200 || respone.status === 201) {
            setListAnswers(respone.data.data);
         }
      } catch (error) {
         const errorMessage = error.response?.data?.message || error.message;
         toast.error("Lấy danh sách câu trả lời thất bại! " + errorMessage, {
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
      setOpenAll(true);
   };

   const handleCloseAll = () => {
      setOpenAll(false);
   };

   const handleOpenUpdate = (question_id, question_title, question_description) => {
      setValue({title: question_title, body: question_description, question_id: question_id});
      setOpenUpdate(true);
   };
   const handleCloseUpdate = () => setOpenUpdate(false);

   const handleClickOpenReply = (question_id, question_title, question_description) => {
      setValue({title: question_title, body: question_description, question_id: question_id});
      setOpenReply(true);
   };

   const handleChangeReply = (content, delta, source, editor) => {
      setReply((prevValue) => ({...prevValue, text: content}));
   };

   const handleCloseReply = () => {
      setReply({text: ""});
      setOpenReply(false);
   };

   const handleClickOpenDelete = () => {
      setOpenDelete(true);
   };

   const handleCloseDelete = () => {
      setOpenDelete(false);
   };

   // Handle input change
   const handleChange = (content, delta, source, editor) => {
      setValue((prevValue) => ({...prevValue, title: content}));
   };

   // Handle ReactQuill change
   const handleQuillChange = (content) => {
      setValue((prevValue) => ({...prevValue, body: content}));
   };

   const handleReply = async () => {
      try {
         if (!reply.text || reply.text === "") {
            toast.warn("Vui lòng điền đầy đủ thông tin câu trả lời trước khi gửi!", {
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
         const response = await axiosInstance.post(`/answers/create/${card?.question_id}`, {
            content: reply.text,
         });
         if (response.status === 201 || response.status === 200) {
            toast.success("Gửi câu trả lời cho ứng viên thành công!", {
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
            setListQuestions((prev) =>
               prev.map((item) => {
                  if (item.question_id === card?.question_id) {
                     return {...item, Answers: [...item.Answers, response.data.data]};
                  }
                  return item;
               })
            );
         }
      } catch (error) {
         const errorMessage = error.response?.data?.message || error.message;
         toast.error("Hồi đáp cho ứng viên thất bại! " + errorMessage, {
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
      } finally {
         handleCloseReply();
      }
   };

   const handleSubmitUpdate = async () => {
      try {
         if (!value.title || !value.body) {
            toast.warn("Vui lòng điền đầy đủ thông tin câu hỏi trước khi cập nhật!", {
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

         const response = await axiosInstance.put(`/questions/update/${value.question_id}`, {
            title: value.title,
            content: value.body,
         });
         if (response.status === 201 || response.status === 200) {
            toast.success("Cập nhật thành công câu hỏi của bạn!", {
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
            // Update câu hỏi trong list câu hỏi
            setListQuestions((prev) =>
               prev.map((item) => {
                  if (item.question_id === value.question_id) {
                     return {...item, question_title: value.title, question_description: value.body};
                  }
                  return item;
               })
            );
         }
      } catch (error) {
         const errorMessage = error.response?.data?.message || error.message;
         toast.error("Cập nhật thất bại! " + errorMessage, {
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
      } finally {
         handleCloseUpdate();
      }
   };

   const handleDelete = async (itemId) => {
      try {
         const response = await axiosInstance.delete(`/questions/delete/${itemId}`);
         if (response.status === 201 || response.status === 200) {
            const notify = () =>
               toast.success("Delete item successfully", {
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
            setListQuestions((prev) => prev.filter((item) => item.question_id !== itemId));
         }
      } catch (error) {
         console.log("error", error);
         if (error.response.data.error === "You are not allowed to access this route") {
            const notify = () =>
               toast.error("You are not allowed to access this route", {
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
         } else {
            const notify = () =>
               toast.error("Delete item failed !", {
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
      }
      setOpenDelete(false);
   };

   const [themeMode, setThemeMode] = React.useState(
      useTheme().mode === "light" ? useTheme().colorSchemes.light : useTheme().colorSchemes.dark
   );

   return (
      <>
         <Modal
            keepMounted
            open={openupdate}
            onClose={handleCloseUpdate}
            sx={{color: "white", overflowX: "scroll"}}
            aria-labelledby='keep-mounted-modal-title'
            aria-describedby='keep-mounted-modal-description'>
            <Box sx={style}>
               <Typography id='keep-mounted-modal-title' variant='h6' component='h2' sx={{textAlign: "center"}}>
                  Bạn muốn chỉnh sửa câu hỏi này?
               </Typography>
               <FormControl sx={{marginTop: "20px", width: "100%"}}>
                  <FormLabel>Tiêu đề câu hỏi</FormLabel>
                  <Input placeholder='Type in here…' name='title' onChange={handleChange} value={value.title} />
               </FormControl>
               <FormControl sx={{marginTop: "20px", width: "100%"}}>
                  <FormLabel sx={{marginTop: "20px"}}>Nội dung câu hỏi</FormLabel>
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
                     Update Questions
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
         <Modal
            keepMounted
            open={openReply}
            onClose={handleCloseReply}
            sx={{color: "white", overflowX: "scroll"}}
            aria-labelledby='keep-mounted-modal-title'
            aria-describedby='keep-mounted-modal-description'>
            <Box sx={style}>
               <FormControl sx={{marginTop: "20px", width: "100%"}}>
                  <Typography id='keep-mounted-modal-title' variant='h4' component='h2' sx={{textAlign: "center"}}>
                     {value.title}
                  </Typography>
                  <Typography
                     id='keep-mounted-modal-title'
                     variant='h6'
                     component='h2'
                     sx={{textAlign: "center", marginTop: "30px"}}>
                     {value.body}
                  </Typography>
               </FormControl>
               <FormControl sx={{marginTop: "20px", width: "100%"}}>
                  <FormLabel sx={{marginTop: "20px", fontSize: "23px", marginBottom: "10px"}}>
                     Nhập nội dung trả lời cho ứng viên:
                  </FormLabel>
                  <ReactQuill
                     onChange={handleChangeReply}
                     value={reply?.text}
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
                  <Button onClick={handleCloseReply}>Disagree</Button>
                  <Button onClick={handleReply} autoFocus sx={{color: "red"}}>
                     Agree
                  </Button>
               </Box>
            </Box>
         </Modal>
         <React.Fragment>
            <Dialog
               open={openDelete}
               onClose={handleCloseDelete}
               aria-labelledby='alert-dialog-title'
               aria-describedby='alert-dialog-description'>
               <DialogTitle id='alert-dialog-title'>Bạn có chắc chắn muốn xóa câu hỏi này không?</DialogTitle>
               <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                     Nội dung câu hỏi: {card?.question_description}
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleCloseDelete}>Disagree</Button>
                  <Button onClick={() => handleDelete(card?.question_id)} sx={{color: "red"}}>
                     Agree
                  </Button>
               </DialogActions>
            </Dialog>
         </React.Fragment>
         <Card
            sx={{
               width: widthCard_new,
               height: "max-content",
               backgroundColor: card?.isQuestionByAdmin ? "#202433" : "rgba(255, 255, 255, .05)",
               webkitBackdropFilter: "blur(15px)",
               backdropFilter: "blur(2px)",
               borderRadius: "10px",
               boxSizing: "border-box",
               border: `2px solid ` + themeMode.border.secondary,
               ":hover": {
                  border: "2px solid " + themeMode.border.hover,
               },
               color: themeMode.text.primary,
               cursor: "pointer",
            }}>
            <CardHeader
               sx={{padding: "10px"}}
               avatar={<Avatar sx={{bgcolor: red[500]}}>R</Avatar>}
               action={[
                  <>
                     <IconButton
                        onClick={() =>
                           handleOpenUpdate(card?.question_id, card?.question_title, card?.question_description)
                        }>
                        <ModeEditIcon sx={{color: "green"}} />
                     </IconButton>
                     <IconButton onClick={() => handleClickOpenDelete(card?.question_id)}>
                        <DeleteOutlineIcon sx={{color: "red"}} />
                     </IconButton>
                  </>,
               ]}
               title={<TextTruncate line={1} element='span' truncateText='…' text={card?.asker.user_name} />}
               subheader={
                  <Typography>
                     <span
                        style={{
                           color: themeMode.text.title,
                        }}>
                        Question at
                     </span>{" "}
                     {formatDateString(card?.created_at)}
                  </Typography>
               }
            />
            <CardContent
               sx={{
                  padding: "0px 10px",
                  height: "88px",
                  color: themeMode.text.primary,
               }}>
               <Typography
                  variant='h6'
                  component='div'
                  sx={{
                     color: themeMode.text.title,
                  }}>
                  {<TextTruncate line={1} element='span' truncateText='…' text={card?.question_title} />}
               </Typography>
               <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{
                     color: themeMode.text.primary,
                  }}>
                  {<TextTruncate line={1} element='div' truncateText='…' text={card?.question_description} />}
               </Typography>
            </CardContent>
            <CardContent
               sx={{
                  height: "128px",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "start",
                  padding: "2px 30px",
               }}>
               {card?.Answers && card?.Answers.length > 0 ? (
                  card.Answers.map(
                     (item, index) =>
                        index < 2 && (
                           <CardHeader
                              key={item.answer_id || index} // Sử dụng `item.id` nếu có, nếu không có thì dùng `index`
                              sx={{
                                 padding: "5px",
                                 marginBottom: "7px",
                                 borderRadius: "10px",
                                 backgroundColor: "rgba(255, 255, 255, .015)",
                                 ":hover": {
                                    backgroundColor: themeMode.hover,
                                 },
                              }}
                              avatar={<QuickreplyIcon />}
                              action={
                                 <IconButton>
                                    <ArrowOutwardIcon sx={{color: themeMode.text.title}} />
                                 </IconButton>
                              }
                              title={
                                 <TextTruncate line={1} element='span' truncateText='…' text={item?.User?.user_name} />
                              }
                              subheader={
                                 <Typography>
                                    <span style={{color: themeMode.text.title}}>Reply at </span>{" "}
                                    {formatDateString(card?.createdAt)}
                                 </Typography>
                              }
                           />
                        )
                  )
               ) : (
                  <Typography variant='h6' component='div' sx={{color: "red", textAlign: "center"}}>
                     <TextTruncate line={1} element='span' truncateText='…' text='No reply yet' />
                  </Typography>
               )}
            </CardContent>
            <CardActions disableSpacing>
               <AvatarGroup total={card?.answerers.length} sx={{float: "left", marginRight: "3px"}}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
               </AvatarGroup>
               <Button size='small' onClick={() => handleClickOpenAll(card?.question_id)}>
                  Show All
               </Button>
               <div style={{flex: "1 1 auto"}}></div>
               <IconButton>
                  <FavoriteBorderIcon
                     sx={{
                        color: "pink",
                        ":hover": {
                           color: "red",
                        },
                     }}
                  />
               </IconButton>
               <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{
                     marginRight: "10px",
                     color: themeMode.text.primary,
                  }}>
                  {card?.question_likes}
               </Typography>
               <Button
                  sx={{float: "right", borderRadius: "10px"}}
                  startIcon={<ReplyIcon />}
                  onClick={() =>
                     handleClickOpenReply(card?.question_id, card?.question_title, card?.question_description)
                  }>
                  Reply
               </Button>
            </CardActions>
         </Card>
         <FullScreenDialog
            isOpen={openAll}
            onClose={handleCloseAll}
            listAnswers={listAnswers}
            setListAnswers={setListAnswers}
         />
      </>
   );
};

export default CardQuestion;
