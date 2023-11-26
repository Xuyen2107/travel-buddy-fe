import { Avatar, CardHeader, FormControl, MenuItem, Select, Typography } from "@mui/material";
import PropTypes from "prop-types";

const CardHeaderCustom = ({ avatarUrl, fullName, onChange, value }) => {
   return (
      <CardHeader
         sx={{ width: "100%", p: "10px 0" }}
         avatar={<Avatar sx={{ width: "40px", height: "40px", border: "1px solid", cursor: "pointer" }} src={avatarUrl} alt="avatar" />}
         title={<Typography sx={{ fontSize: "16px", fontWeight: "500", cursor: "pointer" }}>{fullName}</Typography>}
         subheader={
            <FormControl variant="standard" sx={{ minWidth: 100 }}>
               <Select
                  name="isPublic"
                  onChange={onChange}
                  value={value}
                  sx={{
                     fontSize: "14px",
                     height: "20px",
                  }}
               >
                  <MenuItem value={1} sx={{ fontSize: "14px" }}>
                     Công khai
                  </MenuItem>
                  <MenuItem value={2} sx={{ fontSize: "14px" }}>
                     Bạn bè
                  </MenuItem>
                  <MenuItem value={3} sx={{ fontSize: "14px" }}>
                     Chỉ mình tôi
                  </MenuItem>
               </Select>
            </FormControl>
         }
      />
   );
};

CardHeaderCustom.propTypes = {
   avatarUrl: PropTypes.string.isRequired,
   fullName: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   value: PropTypes.number.isRequired,
};

export default CardHeaderCustom;
