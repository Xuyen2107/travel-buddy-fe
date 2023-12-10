import ChatSideBar from "../../chatRealTime/chatSideBar";
import { Box, Typography } from "@mui/material";
import Navbar from "../../Navbar";
import { useNavigate } from "react-router-dom";

const HomeChat = ({ children }) => {
   const navigate = useNavigate();

   return (
      <Box>
         <Navbar />
         <Box sx={{ display: "flex", maxHeight: "calc(100vh - 64px)", height: "calc(100vh - 64px)", overflow: "hidden" }}>
            <ChatSideBar onClick={(item) => navigate(`/message/${item.chatId}`)} />
            {children ? children : <Typography>Vui lòng chọn đoạn chat để bắt đầu</Typography>}
         </Box>
      </Box>
   );
};

export default HomeChat;
