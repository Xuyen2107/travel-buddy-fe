import { Route, Routes } from "react-router-dom";
import Album from "../pages/Album.jsx";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MapList from "../pages/MapList.jsx";
import Service from "../pages/Service";
import AlbumDetail from "../pages/AlbumDetail.jsx";
import { useSelector } from "react-redux";
import NotFound from "../components/NotFound/NotFound.jsx";

const Navigate = () => {
   const user = useSelector((state) => state.auth.user);
   return (
      <>
         {user === null ? (
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         ) : (
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/Album" element={<Album />} />
               <Route path="/Album/:title" element={<AlbumDetail />} />
               <Route path="/Service" element={<Service />} />
               <Route path="/Map" element={<MapList />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         )}
      </>
   );
};

export default Navigate;
