import { Box, styled } from "@mui/material";

const BoxColumn = styled(Box)({
   display: "flex",
   flexDirection: "column",
   "&::-webkit-scrollbar": {
      width: "8px",
   },
   "&::-webkit-scrollbar-thumb": {
      background: "#bdbdbd",
      borderRadius: "10px",
   },
   "&::-webkit-scrollbar-button": {
      display: "none",
   },
});

export default BoxColumn;
