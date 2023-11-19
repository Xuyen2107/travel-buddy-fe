import { Paper, styled } from "@mui/material";

export const PaperCenter = styled(Paper)({
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   p: 4,
});
