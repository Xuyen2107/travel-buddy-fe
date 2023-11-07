import { MenuItem, FormControl, Select } from "@mui/material";

import { ListContainer, ListTitle } from "../styles/Liststyles.js";
import { useState } from "react";

const List = () => {
   const [type, setType] = useState("restaurants");
   const [rating, setRating] = useState(0);

   return (
      <>
         <ListContainer>
            <ListTitle variant="h4">Nhà Hàng, Khách Sạn và những thứ khác</ListTitle>

            <FormControl>
               <Select variant="standard" value={type} onChange={(e) => setType(e.target.value)}>
                  <MenuItem value="restaurants">Nhà Hàng 🍽</MenuItem>
                  <MenuItem value="hotels">Khách sạn 🏨</MenuItem>
                  <MenuItem value="attractions">Điểm tham quan 🎢</MenuItem>
               </Select>
            </FormControl>

            <FormControl>
               <Select variant="standard" value={rating} onChange={(e) => setRating(e.target.value)}>
                  <MenuItem value={0}>Tất cả ⭐️</MenuItem>
                  <MenuItem value={3}>Lớn hơn 3 ⭐️</MenuItem>
                  <MenuItem value={4}>Lớn hơn 4 ⭐️</MenuItem>
                  <MenuItem value={4.5}>Lớn hơn 4.5 ⭐️</MenuItem>
               </Select>
            </FormControl>
         </ListContainer>
      </>
   );
};

export default List;
