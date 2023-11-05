import { Route, Routes } from "react-router-dom";
import Ablum from "../pages/Ablum.jsx";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MapList from "../pages/MapList.jsx";
import Service from "../pages/Service";
import VacationDetail from "../pages/VacationDetail.jsx";
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
               <Route path="/Ablum" element={<Ablum />} />
               <Route path="/vacation/:title" element={<VacationDetail />} />
               <Route path="/Service" element={<Service />} />
               <Route path="/Map" element={<MapList />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         )}
      </>
   );
};

export default Navigate;
