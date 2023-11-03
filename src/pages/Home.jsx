import style from "../styles/home.module.css";
import Service from "./Service.jsx";
import Testimonials from "./Testimonials.jsx";
import Vacation from "./Vacation.jsx";
import MapList from "./MapList.jsx";
const Home = () => {
   return (
      <div className={style.home}>
         <h1>My home Travel Buddy</h1>
         <Vacation />
         <Service />
         <Testimonials />
         <MapList />
      </div>
   );
};

export default Home;
