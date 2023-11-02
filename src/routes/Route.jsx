import { Route, Routes } from "react-router-dom";
import Ablum from "../pages/Ablum/Ablum.jsx";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MapList from "../pages/Map/MapList.jsx";
import Service from "../pages/Service/Service";
import VacationDetail from "../pages/Vacation/VacationDetail.jsx";
import { useSelector } from "react-redux";

const Navigate = () => {
   const user = useSelector((state) => state.auth.user);
   return (
      <>
         {user === null ? (
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
            </Routes>
         ) : (
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/Ablum" element={<Ablum />} />
               <Route path="/vacation/:title" element={<VacationDetail />} />
               <Route path="/Service" element={<Service />} />
               <Route path="/Map" element={<MapList />} />
            </Routes>
         )}
      </>
   );
};

export default Navigate;
