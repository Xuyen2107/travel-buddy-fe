import { Avatar, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import chatAPI from "../../../apis/chatAPI";
import useCrudApi from "../../../hooks/useCrudApi";

const ChatSideBar = ({onClick}) => {
    const { userLogin } = useSelector((state) => state.auth);
    
    
    
    const { data, loading, fetchData } = useCrudApi(chatAPI.findUserChats);
    

    useEffect(() => {
        fetchData()
    }, []);

    return <Box sx={{ width: "360px",height: "100%",  borderRight: "1px solid"}}>
        <Box sx={{ padding: "4px", display: "flex", alignItems: "center", justifyContent:"center", backgroundColor: "#ccc", height: "64px"}}>
            Nhắn tin 
        </Box>
        <Box sx={{maxHeight: "calc(100% - 64px)", overflowY: "auto",}}>
            {data && data.map((item) => (
            <ListItemButton onClick={()=>onClick(item)} key={item._id} >
                 <ListItemIcon><Avatar src={item.members.avatar}/></ListItemIcon>
                 <ListItemText sx={{whiteSpace: "nowrap"}}>{item.members.fullName}</ListItemText>
             </ListItemButton>
            ))}
          
        </Box>
    </Box>
};


export default ChatSideBar