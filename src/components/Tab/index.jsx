import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Divider, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const TabFont = styled(Tab)({
   textTransform: "none",
});

const CustomTabPanel = (props) => {
   const { children, value, index, ...other } = props;

   return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
         {value === index && (
            <Box sx={{ p: 3 }}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
};

CustomTabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
   return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
   };
};

const TabDefault = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   React.useEffect(() => {
      if (location.pathname === "/profile") setValue(0);
      if (location.pathname === "/profile/vacation") setValue(1);
      if (location.pathname === "/profile/album") setValue(2);
   }, [location]);

   return (
      <Box sx={{ width: "100%", gridArea: "bottom" }}>
         <Divider />
         <Box>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
               <TabFont
                  onClick={() => {
                     navigate("/profile");
                  }}
                  sx={{ textTransform: "none" }}
                  label="Bài viết"
                  {...a11yProps(0)}
               />
               <TabFont
                  onClick={() => {
                     navigate("/profile/vacation");
                  }}
                  label="Kì nghỉ"
                  {...a11yProps(1)}
               />
               <TabFont
                  onClick={() => {
                     navigate("/profile/album");
                  }}
                  label="Ảnh"
                  {...a11yProps(2)}
               />
            </Tabs>
         </Box>
      </Box>
   );
};
export default TabDefault;
