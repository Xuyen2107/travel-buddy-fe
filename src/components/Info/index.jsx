import PlaceIcon from "@mui/icons-material/Place";
import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import CakeIcon from "@mui/icons-material/Cake";
import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import PropTypes from "prop-types";

const genderInfo = {
   1: { text: "Nam", icon: <MaleIcon /> },
   2: { text: "Nữ", icon: <FemaleIcon /> },
   3: { text: "Khác", icon: <TransgenderIcon /> },
};

const InfoUser = ({ userProfile }) => {
   const data = [
      { icon: <PlaceIcon />, text: userProfile?.city?.label },
      { icon: <EmailIcon />, text: userProfile?.email },
      { icon: <SmartphoneIcon />, text: userProfile?.phoneNumber },
      { icon: <CakeIcon />, text: userProfile?.dateOfBirth },
      { icon: <ManageAccountsIcon />, text: userProfile?.age },
      { icon: genderInfo[userProfile?.gender]?.icon, text: genderInfo[userProfile?.gender]?.text },
   ];

   return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", borderRadius: "10px", boxShadow: 4 }}>
         <ListItem>
            <Typography variant="h6" fontWeight="bold">
               Thông tin cá nhân
            </Typography>
         </ListItem>
         <Divider />
         {data.map((item, index) => (
            <ListItem key={index} disablePadding>
               <ListItem>
                  <ListItemIcon sx={{ minWidth: "40px" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
               </ListItem>
            </ListItem>
         ))}
      </List>
   );
};

InfoUser.propTypes = {
   userProfile: PropTypes.object.isRequired,
};

export default InfoUser;
