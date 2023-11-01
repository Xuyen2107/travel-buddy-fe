import * as Yup from "yup";
import { userMessages } from "../utils/userMessage";

const userValidation = (method) => {
   let validateUser;
   const fullNameSchema = Yup.string().required("Họ và tên không được để trống");
   const userNameSchema = Yup.string()
      .min(6, "Tên đăng nhập tối thiểu 6 kí tự")
      .max(20, "Tên đăng nhập tối thiểu 6 kí tự")
      .required("Tên đăng nhập không được để trống");
   const emailSchema = Yup.string().email("Email không hợp lệ").required("Email không được để trống");
   const phoneNumberSchema = Yup.string()
      .matches(/^0\d{9}$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại không được để trống");
   const passwordSchema = Yup.string()
      .required("Mật khẩu không được để trống")
      .min(6, "Mật khẩu tối thiểu 6 kí tự")
      .max(20, "Mật khẩu tối đa 20 kí tự")
      .matches(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
         "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số, một ký tự đặc biệt và không có khoảng trắng",
      );

   if (method === "login") {
      return (validateUser = Yup.object().shape({
         loginInfo: Yup.string().required(userMessages.loginInfo.require),
         password: passwordSchema,
      }));
   }

   if (method === "register") {
      return (validateUser = Yup.object().shape({
         fullName: fullNameSchema,
         userName: userNameSchema,
         email: emailSchema,
         phoneNumber: phoneNumberSchema,
         password: passwordSchema,
         rePassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
            .required("Nhập lại mật khẩu không được để trống"),
      }));
   }

   if (method === "updatePassword") {
      return (validateUser = Yup.object().shape({
         password: passwordSchema,
         newPassword: passwordSchema,
      }));
   }

   if (method === "forgotPassword") {
      return (validateUser = Yup.object().shape({
         email: emailSchema,
         otp: Yup.string().required(userMessages.otp.require),
         password: passwordSchema,
      }));
   }

   return validateUser;
};

export default userValidation;
