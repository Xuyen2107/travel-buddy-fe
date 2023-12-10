import react from "react";
import { Avatar, Box, Button, Input, InputBase, Typography } from "@mui/material";
import { useFormik } from "formik";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { chatAPI, messageAPI } from "../../../apis";
import useCrudApi from "../../../hooks/useCrudApi";
import { useRef } from "react";
import {  Link, useParams } from "react-router-dom";

const Main = () => {
  
  const { chatId } = useParams();
   const { userLogin } = useSelector((state) => state.auth);
   const [dataMessages, setDataMessages] = useState([]);
   

   const { data: dataCreate, loading: loadingCreate, fetchData: fetchDataCreate } = useCrudApi(messageAPI.createMessage);
   const { data, loading, fetchData } = useCrudApi(messageAPI.getAllMessages);
   const { data: dataSingle, loading: loadingSingle, fetchData: fetchDataSingle } = useCrudApi(chatAPI.findChat);
   console.log("🚀 ~ file: index.jsx:23 ~ Main ~ dataSingle:", dataSingle)
   

   const messagesEndRef = useRef(null);

   const scrollToBottom = () => {
      if (messagesEndRef.current) {
         messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
         
      }
   };
   const formik = useFormik({
      initialValues: {
         chatId: chatId,
         text: "",
      },
      enableReinitialize: true,
      onSubmit: async (values) => {
         await fetchDataCreate(values);
         await fetchData(chatId);
         resetForm();
         scrollToBottom();
      },
   });

   const { values, handleChange, handleSubmit, resetForm } = formik;
  //  console.log("🚀 ~ file: index.jsx:44 ~ Main ~ values:", values)

   const removeDuplicates = (arr, field) => {
      const uniqueValues = new Set();
      return arr.filter((item) => {
         if (!uniqueValues.has(item[field])) {
            uniqueValues.add(item[field]);
            return true;
         }
         return false;
      });
   };



   useEffect(() => {
      if (data) {
         const newData = data.docs.reverse();
         const uniqueData = removeDuplicates([...dataMessages, ...newData], "_id");
         setDataMessages(uniqueData);
         scrollToBottom();
         
      }
   }, [data]);

   useEffect(() => {
    if (chatId) {
      fetchDataSingle(chatId)
      fetchData(chatId)
      setDataMessages([]);
    }
 }, [chatId]);
   
    
   return (
      <>
      <Box sx={{ width: "100%", height: "100%" }}>
         <Box
            component={Link} 
            to={`/profile/${dataSingle?._id}`}
            sx={{
               display: "flex",
               width: "100%",
               alignItems: "center",
               background: "#ccc",
               padding: "12px",
               position: "sticky",
               top: "0",
               zIndex: 10,
            }}
         >
            
            <Avatar src={dataSingle?.avatar} sx={{ marginRight: "6px"}}/>
            <Typography color="text.primary">{dataSingle?.fullName}</Typography>
         </Box>
         <Box
            ref={messagesEndRef}
            sx={{ width: "100%", height: "100%", maxHeight: "calc(100% - 64px - 44px)", overflow: "hidden", overflowY: "auto" }}
         >
            {dataMessages.length > 0 &&
               dataMessages.map((item) => {
                  if (item.senderId._id === userLogin._id) {
                     return (
                        <Box key={item._id} sx={{ display: "flex", justifyContent: "flex-end", gap: "10px", padding: "4px" }}>
                           <Typography sx={{ backgroundColor: "#ccc", padding: "10px", borderRadius: "20px" }}>{item.text}</Typography>
                           <Avatar src={item.senderId.avatar} sx={{ width: "40px", height: "40px" }} />
                        </Box>
                     );
                  } else {
                     return (
                        <Box key={item._id} sx={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "4px" }}>
                           <Avatar src={item.senderId.avatar} sx={{ width: "40px", height: "40px" }} />
                           <Typography sx={{ backgroundColor: "#ccc", padding: "10px", borderRadius: "20px" }}>{item.text}</Typography>
                        </Box>
                     );
                  }
               })}
         </Box>

         <Box sx={{ position: "sticky", bottom: "0", width: "100%", bgcolor: "#ccc" }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
               <InputBase
                  onFocus={scrollToBottom}
                  name="text"
                  type="text"
                  value={values.text}
                  placeholder="Type a message"
                  onChange={handleChange}
                  sx={{ width: "100% ", padding: "6px" }}
               />
               <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                  Send
               </Button>
            </Box>
         </Box>
      </Box></>
   );
};

export default Main;

