import { useState } from "react";
import debounce from "lodash/debounce";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, IconButton, InputBase, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { userAPI } from "../../apis";
import { useCrudApi } from "../../hooks";

const SearchForm = () => {
   const [isPopupVisible, setPopupVisible] = useState(false);
   const { data, loading, setData, fetchData } = useCrudApi(userAPI.searchUser);

   const delayedSearch = debounce(async (value) => {
      setData(null);
      await fetchData(value);
   }, 500);

   const handleChange = async (event) => {
      const { value } = event.target;
      await delayedSearch(value);
   };

   return (
      <Box component="form" sx={{ position: "relative", bgcolor: "background.input", borderRadius: "20px", p: "2px 10px 2px 40px", width: "100%" }}>
         <InputBase
            sx={{ fontWeight: 500 }}
            onFocus={() => setPopupVisible(true)}
            onBlur={() =>
               setTimeout(() => {
                  setPopupVisible(false);
               }, 300)
            }
            onChange={handleChange}
            fullWidth
            type="text"
            placeholder="Tìm kiếm người dùng..."
         />
         <IconButton sx={{ position: "absolute", left: 10, top: 0, transform: "translateY(25%)", color: "text.primary", p: 0 }}>
            <Search />
         </IconButton>
         {isPopupVisible && (
            <Paper sx={{ position: "absolute", left: 0, width: "100%", height: "auto" }}>
               {loading === true ? (
                  <CircularProgress color="success" size="20px" />
               ) : data ? (
                  data.map((item) => (
                     <ListItemButton onClick={() => setPopupVisible(false)} key={item._id} component={Link} to={`/profile/${item._id}`}>
                        <ListItemIcon>
                           <Avatar src={item.avatar} sx={{ width: "36px", height: "36px" }} />
                        </ListItemIcon>
                        <ListItemText primary={item.fullName} />
                     </ListItemButton>
                  ))
               ) : (
                  <Typography sx={{ p: "10px" }}>Không có dữ liệu</Typography>
               )}
            </Paper>
         )}
      </Box>
   );
};

export default SearchForm;
