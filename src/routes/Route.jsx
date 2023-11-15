import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import AlbumDetail from "../pages/AlbumDetail.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";
import { useSelector } from "react-redux";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import PostDetail from "../pages/PostDetail.jsx";
import VacationDetail from "../pages/VacationDetail.jsx";

const Navigate = () => {
   const user = useSelector((state) => state.auth.user);
   return (
      <>
         {user === null ? (
            <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/register" element={<Register />} />
            </Routes>
         ) : (
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/profile/:userId" element={<ProfilePage />}>
                  <Route path="vacation" element={<VacationDetail />} />
                  <Route path="album" element={<AlbumDetail />} />
               </Route>
               <Route path="/album/:albumId" element={<AlbumDetail />} />
               <Route path="/vacation/:vacationId" element={<VacationDetail />} />
               <Route path="/post/:postId" element={<PostDetail />} />
               <Route path="/profile/:userId" element={<ProfilePage />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         )}
      </>
   );
};

export default Navigate;
