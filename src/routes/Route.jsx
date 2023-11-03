import { Route, Routes } from "react-router-dom";
import Album from "../pages/Album.jsx";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MapList from "../pages/MapList.jsx"
import Service from "../pages/Service";
import VacationDetail from "../pages/VacationDetail.jsx";

const Navigate = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />

         <Route path="/album" element={<Album />} />
         <Route path="/album/:title" element={<VacationDetail />} /> 
         
      
      
         
         <Route path="/Service" element={<Service />} />
         <Route path="/Map" element={<MapList />} />
      </Routes>
   );
};

export default Navigate;
