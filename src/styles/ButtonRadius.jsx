import { Button, styled } from "@mui/material";

const ButtonRadius = styled(Button)({
   "& .MuiButton-startIcon": {
      margin: 0,
   },
   "&.MuiButton-root": {
      minWidth: 0,
   },
});

export default ButtonRadius;
