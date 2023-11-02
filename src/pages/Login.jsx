import { LoadingButton } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import style from "../styles/login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginSuccess } from "../redux/authSlice";
import userValidation from "../validations/userValidation";
import { authAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
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
            const profileResponse = await authAPI.authInfo(accessToken);
            const userInfo = profileResponse.data.userInfo;
            dispatch(loginSuccess(userInfo));
            setLoading(false);
            navigate("/");
         } catch (error) {
            dispatch(loginFailure(error.response.data.message || "Có lỗi xảy ra khi đăng nhập"));
            setLoading(false);
         }
      },

      validationSchema: userValidation("login"),
   });

   const { handleSubmit, handleChange, errors, values } = formik;

   return (
      <div className={style.register}>
         <form className={style.formRegister} onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
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
         </form>
         <button
            onClick={() => {
               navigate(-1);
            }}
         >
            back
         </button>
      </div>
   );
};

export default Login;
