import { TextField } from "@mui/material";

const TextFieldCustom = (props) => {
   const { customSx, ...otherProps } = props;

   return (
      <TextField
         fullWidth
         variant="outlined"
         size="small"
         {...otherProps}
         sx={{
            "& .MuiInputBase-input": { bgcolor: "background.input", p: "8.5px 14px" },
            "& .MuiInputBase-root": {
               p: 0,
            },
            ...customSx,
         }}
      />
   );
};

export default TextFieldCustom;
