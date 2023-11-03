import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout/Layout";
import { authAPI } from "./services/api";
import { useEffect } from "react";
import { loginStart, loginSuccess, logout } from "./redux/authSlice";

const App = () => {
   const dispatch = useDispatch();
   const loading = useSelector((state) => {
      return state.auth.loading
   })
   useEffect(() => {
      const fetchData = async () => {
         const accessToken = localStorage.getItem("accessToken") ? JSON.parse(localStorage.getItem("accessToken")) : null;
         if (accessToken) {
            try {
               dispatch(loginStart());
               const response = await authAPI.authInfo(accessToken);
               const userInfo = response.data.userInfo;
               dispatch(loginSuccess(userInfo));
            } catch (error) {
               dispatch(logout());
               localStorage.removeItem("accessToken");
            }
         } else {
            dispatch(logout());
            localStorage.removeItem("accessToken");
         }
      };

      fetchData();
   }, []);

   return (
      <div>
         {loading ? (
            <div>Loading...</div>
         ) : (
            <div>
               <Layout />
            </div>
         )}
      </div>
   );
};

export default App;
