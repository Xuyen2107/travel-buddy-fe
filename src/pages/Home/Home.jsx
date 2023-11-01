import style from "./home.module.css";
import Service from "../Service/Service.jsx";
import Testimonials from "../Testimonial/Testimonials.jsx";
import Vacation from "../Vacation/Vacation.jsx";
// import MapList from "../Map/MapList.jsx";

const Home = () => {
   return (
      <div className={style.home}>
         <h1>My home Travel Buddy</h1>
         <Vacation />
         <Service /> 
         <Testimonials />
         
      </div>
   );
};

export default Home;
