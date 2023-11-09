import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import userValidation from "../validations/userValidation";
import { authAPI } from "../services/api";

const Register = () => {
   const isNonMobileScreens = useMediaQuery("(min-width: 767px)");
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const formik = useFormik({
      initialValues: {
         fullName: "",
         userName: "",
         email: "",
         phoneNumber: "",
         password: "",
         rePassword: "",
      },

      onSubmit: async (values) => {
         try {
            setLoading(true);
            await authAPI.register(values);
            navigate("/login");
            setLoading(false);
         } catch (error) {
            setError(error.response.data.message);
         }
      },

      validationSchema: userValidation("register"),
   });

   const { handleSubmit, handleChange, errors, values } = formik;

   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
         }}
      >
         <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               gap: "20px",
               width: isNonMobileScreens ? "600px" : "90%",
               padding: "20px",
               borderLeft: "1px solid",
               borderTop: "1px solid",
               boxShadow: "2px 2px 2px",
               bgcolor: "#fff",
            }}
         >
            <Typography variant="h4">Đăng kí</Typography>
            <TextField
               type="text"
               name="fullName"
               value={values.fullName}
               onChange={handleChange}
               error={errors.fullName}
               helperText={errors.fullName}
               fullWidth
               label="Họ và Tên"
               variant="standard"
            />
            <TextField
               type="text"
               name="userName"
               value={values.userName}
               onChange={handleChange}
               error={errors.userName}
               helperText={errors.userName}
               fullWidth
               label="Tên đăng nhập"
               variant="standard"
            />
            <TextField
               name="email"
               type="email"
               value={values.email}
               onChange={handleChange}
               error={errors.email}
               helperText={errors.email}
               fullWidth
               label="Email"
               variant="standard"
            />
            <TextField
               name="phoneNumber"
               type="tel"
               value={values.phoneNumber}
               onChange={handleChange}
               error={errors.phoneNumber}
               helperText={errors.phoneNumber}
               fullWidth
               label="Số điện thoại"
               variant="standard"
            />
            <TextField
               name="password"
               type="password"
               value={values.password}
               onChange={handleChange}
               error={errors.password}
               helperText={errors.password}
               fullWidth
               label="Mật khẩu"
               variant="standard"
            />
            <TextField
               name="rePassword"
               type="password"
               value={values.rePassword}
               onChange={handleChange}
               error={errors.rePassword}
               helperText={errors.rePassword}
               fullWidth
               label="Nhập lại mật khẩu"
               variant="standard"
            />

            {loading ? (
               <LoadingButton loading variant="outlined">
                  Submit
               </LoadingButton>
            ) : (
               <Button type="submit" variant="contained">
                  Đăng kí
               </Button>
            )}

            {error && <Typography component="label">{error}</Typography>}
            <Box
               sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: isNonMobileScreens ? "flex-end" : "center",
                  alignItems: "center",
               }}
            >
               <Typography sx={{ color: "blue" }} component={Link} to="/">
                  Đăng nhập?
               </Typography>
            </Box>
         </Box>
      </Box>
   );
};

export default Register;
