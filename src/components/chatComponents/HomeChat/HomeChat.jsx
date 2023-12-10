import ChatSideBar from "../../chatRealTime/chatSideBar";
import { Box } from "@mui/material";
import Navbar from "../../Navbar";
import { useNavigate } from "react-router-dom";


const HomeChat = ({children}) => {
  
  const navigate = useNavigate();
 

  return (
    <Box>
      <Navbar/>
    <Box sx={{display: "flex", maxHeight: "calc(100vh - 64px)",height: "calc(100vh - 64px)", overflow: "hidden"}}>
      <ChatSideBar onClick={(item) => navigate(`/message/${item.chatId}`)} /> 
      {children}
    </Box>
    </Box>
  );
};

export default HomeChat;
