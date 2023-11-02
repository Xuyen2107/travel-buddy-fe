import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import userValidation from "../validations/userValidation";
import { authAPI } from "../services/api";
import style from "../styles/register.module.css";

const Register = () => {
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
      <div className={style.register}>
         <form className={style.formRegister} onSubmit={handleSubmit}>
            <h2>Đăng kí</h2>
            <TextField
               type="text"
               name="fullName"
               value={values.fullName}
               onChange={handleChange}
               error={errors.fullName}
               helperText={errors.fullName}
               fullWidth
               margin="dense"
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
               margin="dense"
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
               margin="dense"
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
               margin="dense"
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
               margin="dense"
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
               margin="dense"
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

            {error && <p>{error}</p>}
         </form>
      </div>
   );
};

export default Register;
