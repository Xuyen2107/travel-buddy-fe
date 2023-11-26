import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import userValidation from "../validations/userValidation";
import { authAPI } from "../services/api";
import { TextFieldCustom } from "../styles/index";
import { login } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
   const isNonMobileScreens = useMediaQuery("(min-width: 767px)");
   const navigate = useNavigate();
   const dispatch = useDispatch();
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
            const response = await authAPI.register(values);
            const accessToken = response.data;
            localStorage.setItem("accessToken", JSON.stringify(accessToken));
            const profileResponse = await authAPI.authInfo(accessToken);
            const userInfo = profileResponse.data;
            dispatch(login(userInfo));
            navigate("/");
            setLoading(false);
         } catch (error) {
            setLoading(false);
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
            background: `url("https://stride.com.au/wp-content/uploads/2022/04/social-wellness.jpg")`,
         }}
      >
         <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               gap: "18px",
               width: isNonMobileScreens ? "600px" : "90%",
               padding: "20px",
               borderLeft: "1px solid",
               borderTop: "1px solid",
               boxShadow: "2px 2px 2px",
               bgcolor: "background.paper",
               borderRadius: "10px ",
            }}
         >
            <Typography variant="h4">Đăng kí</Typography>
            <TextFieldCustom
               type="text"
               name="fullName"
               value={values.fullName}
               onChange={handleChange}
               error={errors.fullName}
               helperText={errors.fullName}
               label="Họ và Tên"
            />
            <TextFieldCustom
               type="text"
               name="userName"
               value={values.userName}
               onChange={handleChange}
               error={errors.userName}
               helperText={errors.userName}
               label="Tên đăng nhập"
            />
            <TextFieldCustom
               name="email"
               type="email"
               value={values.email}
               onChange={handleChange}
               error={errors.email}
               helperText={errors.email}
               label="Email"
            />
            <TextFieldCustom
               name="phoneNumber"
               type="tel"
               value={values.phoneNumber}
               onChange={handleChange}
               error={errors.phoneNumber}
               helperText={errors.phoneNumber}
               label="Số điện thoại"
            />
            <TextFieldCustom
               name="password"
               type="password"
               value={values.password}
               onChange={handleChange}
               error={errors.password}
               helperText={errors.password}
               label="Mật khẩu"
            />
            <TextFieldCustom
               name="rePassword"
               type="password"
               value={values.rePassword}
               onChange={handleChange}
               error={errors.rePassword}
               helperText={errors.rePassword}
               label="Nhập lại mật khẩu"
            />

            {loading ? (
               <LoadingButton loading variant="outlined">
                  Đăng kí
               </LoadingButton>
            ) : (
               <Button type="submit" variant="contained">
                  Đăng kí
               </Button>
            )}

            {error && (
               <Typography
                  component="p"
                  sx={{
                     fontSize: "1rem",
                     color: "red",
                     m: "0 14px",
                  }}
               >
                  {error}
               </Typography>
            )}
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
