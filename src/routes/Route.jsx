import { Route, Routes } from "react-router-dom";
import HomeChat from "../components/chatComponents/HomeChat/HomeChat.jsx"
import HomePage from "../pages/HomePage.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";
import { useSelector } from "react-redux";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import PostDetail from "../pages/PostDetail.jsx";
import VacationDetail from "../pages/VacationDetail.jsx";
import Main from "../components/chatRealTime/Main/index.jsx";


const Navigate = () => {
   const { isLogin } = useSelector((state) => state.auth);
   return (
      <>
         {isLogin === false ? (
            <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />

            </Routes>
         ) : (
            <>
               <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/message" element={ <HomeChat /> } />
                  <Route path="/message/:chatId" element={ <HomeChat> <Main /> </HomeChat> } />
                  <Route path="/profile/:userId" element={<ProfilePage></ProfilePage>} />
                  <Route path="/profile/:userId/vacation" element={<ProfilePage></ProfilePage>} />
                  <Route path="/profile/:userId/album" element={<ProfilePage></ProfilePage>} />
                  <Route path="/vacation/:vacationId" element={<VacationDetail />} />
                  <Route path="/post/:postId" element={<PostDetail />} />
                  <Route path="*" element={<NotFound />} />
               </Routes>
            </>
         )}
      </>
   );
};

export default Navigate;
