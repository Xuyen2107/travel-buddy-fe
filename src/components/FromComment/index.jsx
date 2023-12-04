import PropTypes from "prop-types";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { InputBase, Box, IconButton, Avatar, Stack, Snackbar } from "@mui/material";
import { commentAPI, replyCommentAPI } from "../../apis";
import { useCrudApi } from "../../hooks";
import { forwardRef, useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CommentForm = ({ inputRef, typeSubmit, commentContent, postId, commentId, onProcessDone }) => {
   const [open, setOpen] = useState(false);
   const { userLogin } = useSelector((state) => state.auth);
   const { loading: loadingCreate, error: errorCreate, fetchData: fetchDataCreate } = useCrudApi(commentAPI.createComment);
   const { data: dataUpdate, loading: loadingUpdate, error: errorUpdate, fetchData: fetchDataUpdate } = useCrudApi(commentAPI.createComment);
   const { loading: loadingCreateReply, error: errorCreateReply, fetchData: fetchDataCreateReply } = useCrudApi(replyCommentAPI.createComment);
   const {
      data: dataUpdateReply,
      loading: loadingUpdateReply,
      error: errorUpdateReply,
      fetchData: fetchDataUpdateReply,
   } = useCrudApi(replyCommentAPI.updateComment);
   // handleButtonClick = () => {
   //    inputRef.current.focus();
   //    inputRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
   // };

   const formik = useFormik({
      initialValues: {
         commentContent: commentContent || "",
      },

      onSubmit: async (values) => {
         if (typeSubmit === "createComment") {
            await fetchDataCreate(postId, values);
            // await onProcessDone();
         }

         if (typeSubmit === "updateComment") {
            await fetchDataUpdate(commentId, values);
            await onProcessDone();
         }

         if (typeSubmit === "createReply") {
            await fetchDataCreateReply(commentId, values);
            await onProcessDone();
         }

         if (typeSubmit === "updateReply") {
            await fetchDataUpdateReply(commentId, values);
            await onProcessDone();
         }

         resetForm();
      },
   });
   const { values, handleChange, handleSubmit, resetForm } = formik;

   useEffect(() => {
      if (errorCreate || errorUpdate || errorCreateReply || errorUpdateReply) {
         setOpen(true);
      }
   }, [errorCreate, errorCreateReply, errorUpdate, errorUpdateReply]);

   const handleClose = (event, reason) => {
      if (reason === "clickaway") {
         return;
      }
      setOpen(false);
   };

   return (
      <Box>
         <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", alignItems: "flex-start", gap: "10px", width: "100%" }}>
            <Avatar src={userLogin.avatar} alt="Avatar" sx={{ flexShrink: 0 }} />
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  backgroundColor: "background.input",
                  borderRadius: "20px",
                  padding: "10px",
                  flex: 1,
               }}
            >
               <InputBase
                  inputRef={inputRef}
                  id="name"
                  name="commentContent"
                  multiline
                  maxRows={100}
                  placeholder="Viết bình luận"
                  onChange={handleChange}
                  value={values.commentContent}
                  sx={{ width: "100%" }}
               />
               <Box>
                  {loadingCreate === true || loadingUpdate === true || loadingCreateReply === true || loadingUpdateReply === true ? (
                     <LoadingButton loading>
                        <SendIcon />
                     </LoadingButton>
                  ) : values.commentContent.length > 0 ? (
                     <IconButton disableRipple type="submit" sx={{ color: "#0062D2" }}>
                        <SendIcon />
                     </IconButton>
                  ) : (
                     <IconButton disabled>
                        <SendIcon />
                     </IconButton>
                  )}
               </Box>
            </Box>
         </Box>
         <Stack sx={{ width: "100%" }} spacing={2}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
               <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                  Có lỗi xảy ra!
               </Alert>
            </Snackbar>
         </Stack>
      </Box>
   );
};

CommentForm.propTypes = {
   postId: PropTypes.string,
   inputRef: PropTypes.object,
   commentId: PropTypes.string,
   typeSubmit: PropTypes.string,
   onProcessDone: PropTypes.func,
   commentContent: PropTypes.string,
};

export default CommentForm;
