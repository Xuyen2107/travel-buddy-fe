import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout";
import { authAPI } from "./services/api";
import { useEffect } from "react";
import { login, logout } from "./redux/authSlice";
import Loading from "./components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const App = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { loading } = useSelector((state) => state.auth);
   const token = useSelector((state) => state.auth.token);

   const handleLogout = () => {
      dispatch(logout());
   };

   useEffect(() => {
      const fetchData = async () => {
         if (token) {
            try {
               const response = await authAPI.authInfo(token);
               const userInfo = response.data;
               setTimeout(() => {
                  dispatch(login(userInfo));
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
