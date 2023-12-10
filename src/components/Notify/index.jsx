import { Notifications } from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useCrudApi } from "../../hooks";
import { notifyAPI } from "../../apis";
import { Link } from "react-router-dom";

const Notify = () => {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const { data, loading, fetchData } = useCrudApi(notifyAPI.getAllNotify);

   useEffect(() => {
      fetchData();
   }, []);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <div>
         <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            disableRipple
            sx={{ p: 0, "&:hover": { bgcolor: "none" } }}
         >
            <Badge badgeContent={17} color="error">
               <Notifications color="text.primary" />
            </Badge>
         </IconButton>
         <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               "aria-labelledby": "basic-button",
            }}
         >
            {data &&
               data.docs.map((item) => (
                  <Box key={item._id}>
                     <ListItemButton component={Link} to={item.link}>
                        <ListItemIcon>
                           <Avatar src={item.author.avatar} />
                        </ListItemIcon>
                        <ListItemText>{item.author.fullName + " " + item.content}</ListItemText>
                     </ListItemButton>
                  </Box>
               ))}
         </Menu>
      </div>
   );
};

export default Notify;
