import { Box, Divider, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserImage from "../UserImage";
import { userAPI } from "../../services/api";
import { useTheme } from "@emotion/react";

const ListFriend = () => {
   const [friends, setFriends] = useState([]);
   const userId = useParams().userId;
   const { palette } = useTheme();

   useEffect(() => {
      const fetchData = async () => {
         const response = await userAPI.getFriends(userId);
         setFriends(response.data.docs);
      };

      fetchData();
   }, [userId]);

   return (
      <Box
         sx={{
            bgcolor: palette.background.paper,
            padding: "10px",
            borderRadius: "10px",
         }}
      >
         <Box>
            <Typography variant="h6" fontWeight="bold">
               Bạn bè
            </Typography>
            <Divider
               sx={{
                  m: "5px 0",
               }}
            />
         </Box>
         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
               gap: "10px",
            }}
         >
            {friends.length > 0 ? (
               friends.map((item, idx) => (
                  <Box
                     component={Link}
                     to={`/profile/${item.friend._id}`}
                     key={idx}
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                     }}
                  >
                     <UserImage size="40px" avatarUrl={item.friend.avatar} />
                     <Typography>{item.friend.fullName}</Typography>
                  </Box>
               ))
            ) : (
               <Box>
                  <Typography>Không có dữ liệu</Typography>
               </Box>
            )}
         </Box>
      </Box>
   );
};

export default ListFriend;
