import { Button, styled } from "@mui/material";

export const ButtonRadius = styled(Button)({
   position: "absolute",
   padding: "10px",
   borderRadius: "50%",
   backgroundColor: "",
   "& .MuiButton-startIcon": {
      margin: 0,
   },
   "&.MuiButton-root": {
      minWidth: 0,
   },
});
