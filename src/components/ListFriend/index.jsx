import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ListFriend = ({ friends }) => {
   const navigate = useNavigate();
   return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", borderRadius: "10px", boxShadow: 4 }}>
         <ListItem>
            <Typography variant="h6" fontWeight="bold">
               Bạn bè
            </Typography>
         </ListItem>
         <Divider />
         {friends?.map((item, idx) => (
            <ListItemButton key={idx} sx={{ cursor: "pointer" }} onClick={() => navigate(`/profile/${item.friend._id}`)}>
               <ListItemAvatar>
                  <Avatar src={item.friend.avatar} alt="avatar" />
               </ListItemAvatar>
               <ListItemText primary={item.friend.fullName} />
            </ListItemButton>
         ))}
      </List>
   );
};

ListFriend.propTypes = {
   friends: PropTypes.array.isRequired,
};

export default ListFriend;
