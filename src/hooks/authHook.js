import { useDispatch } from "react-redux";
import { login, logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../apis";

const useAuth = () => {
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

   if (token === null) {
      dispatch(logout());
      localStorage.removeItem("accessToken");
   }

   return { handelLogout, fetchDataUseLogin };
};

export default useAuth;
