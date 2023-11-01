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
         } catch (error) {
            setError(error.response.data.message);
         } finally {
            setLoading(false);
            navigate("/login");
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
               id="standard-basic"
               type="text"
               name="fullName"
               value={values.fullName}
               onChange={handleChange}
               helperText={errors.fullName}
               fullWidth
               margin="dense"
               label="Họ và Tên"
               variant="standard"
            />
            <TextField
               id="standard-basic"
               type="text"
               name="userName"
               value={values.userName}
               onChange={handleChange}
               helperText={errors.userName}
               fullWidth
               margin="dense"
               label="Tên đăng nhập"
               variant="standard"
            />
            <TextField
               id="standard-basic"
               name="email"
               type="email"
               value={values.email}
               onChange={handleChange}
               helperText={errors.email}
               fullWidth
               margin="dense"
               label="Email"
               variant="standard"
            />
            <TextField
               id="standard-basic"
               name="phoneNumber"
               type="tel"
               value={values.phoneNumber}
               onChange={handleChange}
               helperText={errors.phoneNumber}
               fullWidth
               margin="dense"
               label="Số điện thoại"
               variant="standard"
            />
            <TextField
               id="standard-basic"
               name="password"
               type="password"
               value={values.password}
               onChange={handleChange}
               helperText={errors.password}
               fullWidth
               margin="dense"
               label="Mật khẩu"
               variant="standard"
            />
            <TextField
               id="standard-basic"
               name="rePassword"
               type="password"
               value={values.rePassword}
               onChange={handleChange}
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
