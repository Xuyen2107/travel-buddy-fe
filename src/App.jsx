import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout";
import { authAPI } from "./services/api";
import { useEffect } from "react";
import { loginSuccess, logout } from "./redux/authSlice";
import Loading from "./components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const App = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const loading = useSelector((state) => state.auth.loading);

   const handleLogout = () => {
      dispatch(logout());
      localStorage.removeItem("accessToken");
   };

   useEffect(() => {
      const fetchData = async () => {
         const accessToken = localStorage.getItem("accessToken") === null ? null : JSON.parse(localStorage.getItem("accessToken"));
         if (accessToken) {
            try {
               const response = await authAPI.authInfo(accessToken);
               const userInfo = response.data.userInfo;
               setTimeout(() => {
                  dispatch(loginSuccess(userInfo));
               }, 1000);
            } catch (error) {
               handleLogout();
               navigate("/");
            }
         } else {
            handleLogout();
         }
      };

      fetchData();
   }, []);

   return (
      <>
         {loading ? (
            <Loading />
         ) : (
            <div>
               <Layout />
            </div>
         )}
      </>
   );
};

export default App;
