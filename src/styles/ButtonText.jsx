import { Button } from "@mui/material";
import { styled } from "@mui/system";

const ButtonText = styled(Button)({
   color: "text.primary",
   padding: 0,
   textTransform: "none",
   "&:hover": {
      backgroundColor: "transparent",
   },
});

export default ButtonText;
