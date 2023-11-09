import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginSuccess } from "../redux/authSlice";
import userValidation from "../validations/userValidation";
import { authAPI } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
   const isNonMobileScreens = useMediaQuery("(min-width: 767px)");

   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const error = useSelector((state) => state.auth.error);

   const formik = useFormik({
      initialValues: {
         loginInfo: "",
         password: "",
      },

      onSubmit: async (values) => {
         try {
            setLoading(true);
            const response = await authAPI.login(values);
            const accessToken = response.data.accessToken;
            localStorage.setItem("accessToken", JSON.stringify(accessToken));
            const profileResponse = await authAPI.authInfo();
            const userInfo = profileResponse.data.userInfo;
            dispatch(loginSuccess(userInfo));
            setLoading(false);
            navigate("/");
         } catch (error) {
            dispatch(loginFailure(error.response.data.message || "Có lỗi xảy ra khi đăng nhập"));
            setLoading(false);
            console.log(error);
         }
      },

      validationSchema: userValidation("login"),
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
            <Typography variant="h4">Đăng nhập</Typography>
            <TextField
               type="text"
               name="loginInfo"
               value={values.loginInfo}
               onChange={handleChange}
               error={errors.loginInfo}
               helperText={errors.loginInfo}
               fullWidth
               margin="dense"
               label="Tên đăng nhập, email, hoặc số điện thoại"
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
               margin="dense"
               label="Mật khẩu"
               variant="standard"
            />

            {loading ? (
               <LoadingButton loading variant="outlined">
                  Đăng nhập
               </LoadingButton>
            ) : (
               <Button type="submit" variant="contained">
                  Đăng nhập
               </Button>
            )}

            {error && <p>{error}</p>}

            <Box
               sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: isNonMobileScreens ? "" : "column",
                  justifyContent: isNonMobileScreens ? "space-between" : "",
                  alignItems: "center",
               }}
            >
               <Typography sx={{ color: "blue" }} component={Link} to="/forgot-password">
                  Quên mật khẩu?
               </Typography>
               <Typography sx={{ color: "blue" }} component={Link} to="/register">
                  Đăng kí tài khoản?
               </Typography>
            </Box>
         </Box>
      </Box>
   );
};

export default Login;
