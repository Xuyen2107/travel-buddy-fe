import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import userValidation from "../validations/userValidation";
import { authAPI } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextFieldCustom } from "../styles/TextFieldCustom";
import { BoxColumn } from "../styles/BoxColumn";

const Login = () => {
   const isNonMobileScreens = useMediaQuery("(min-width: 767px)");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const formik = useFormik({
      initialValues: {
         loginInfo: "",
         password: "",
      },

      onSubmit: async (values) => {
         try {
            setLoading(true);
            const response = await authAPI.login(values);
            const accessToken = response.data;
            localStorage.setItem("accessToken", JSON.stringify(accessToken));
            const profileResponse = await authAPI.authInfo(accessToken);
            const userInfo = profileResponse.data;
            dispatch(login(userInfo));
            navigate("/");
            setLoading(false);
         } catch (error) {
            console.error(error);
            setError(error.response.data.message);
            setLoading(false);
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
            background: `url("https://stride.com.au/wp-content/uploads/2022/04/social-wellness.jpg")`,
         }}
      >
         <BoxColumn
            component="form"
            onSubmit={handleSubmit}
            sx={{
               gap: "18px",
               width: isNonMobileScreens ? "600px" : "90%",
               padding: "20px",
               borderLeft: "1px solid",
               borderTop: "1px solid",
               boxShadow: "2px 2px 2px",
               bgcolor: "background.paper",
               borderRadius: "10px",
            }}
         >
            <Typography variant="h4">Đăng nhập</Typography>
            <TextFieldCustom
               type="text"
               name="loginInfo"
               value={values.loginInfo}
               onChange={handleChange}
               error={errors.loginInfo}
               helperText={errors.loginInfo}
               label="Tên đăng nhập, email, hoặc số điện thoại"
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

            {loading ? (
               <LoadingButton loading variant="outlined">
                  Đăng nhập
               </LoadingButton>
            ) : (
               <Button type="submit" variant="contained">
                  Đăng nhập
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
         </BoxColumn>
      </Box>
   );
};

export default Login;
