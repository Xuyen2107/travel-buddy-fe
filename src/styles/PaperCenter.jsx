import { Paper, styled } from "@mui/material";

const PaperCenter = styled(Paper)({
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   borderRadius: "10px",
});

export default PaperCenter;
