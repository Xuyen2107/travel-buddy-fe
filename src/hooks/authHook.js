import { useDispatch } from "react-redux";
import { authAPI } from "../services/api";
import { login, logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const AuthHook = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const token = localStorage.getItem("accessToken") === null || undefined ? null : JSON.parse(localStorage.getItem("accessToken"));

   const fetchDataUseLogin = async () => {
      try {
         const response = await authAPI.authInfo(token);
         dispatch(login(response.data));
      } catch (error) {
         console.error(error.response.data);
         handelLogout();
      }
   };

   const handelLogout = () => {
      dispatch(logout());
      localStorage.removeItem("accessToken");
      navigate("/");
   };

   return { handelLogout, fetchDataUseLogin };
};

export default AuthHook;
