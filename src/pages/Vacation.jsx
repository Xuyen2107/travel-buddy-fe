import  { useState, useEffect } from "react";
import  { useSelector, useDispatch } from "react-redux";
// import { addAlbum , removeAlbum } from "../redux/albumSlice.js";
// import { albumAPI, authAPI } from "../services/api";
import { Link } from "react-router-dom";


import "../styles/Vacation.css";

import Destination1 from "../assets/images/assets/Destination1.png";
import Destination2 from "../assets/images/assets/Destination2.png";
import Destination3 from "../assets/images/assets/Destination3.png";
import Destination4 from "../assets/images/assets/Destination4.png";
import Destination5 from "../assets/images/assets/Destination5.png";
import Destination6 from "../assets/images/assets/Destination6.png";
import info1 from "../assets/images/assets/info1.png";
import info2 from "../assets/images/assets/info2.png";
import info3 from "../assets/images/assets/info3.png";

function Vacation() {
   const [active, setActive] = useState();
   const [albumData, setAlbumData] = useState(null);
   // const dispatch = useDispatch();
   const albums = useSelector((state) =>  state.album);
   console.log("🚀 ~ file: Vacation.jsx:25 ~ Vacation ~ albums:", albums)
   const auth = useSelector((state) => state.auth);
   console.log("🚀 ~ file: Vacation.jsx:27 ~ Vacation ~ auth:", auth)
   
   // const handleRemoveAlbum = (albumId) => {
   //    dispatch(removeAlbum(albumId));
   //  };
  
   //  const handleSubmit = async (values) => {
   //    try {
   //      dispatch(addAlbum(values));
   //      const response = await albumAPI.create(values);
  
   //      // Add any further logic here
   //    } catch (error) {
   //      // Handle error here
   //    }
   //  };

   // useEffect(() => {
   //    const fetchAlbumData = async () => {
   //      try {
   //        const response = await albumAPI.getAll();
          
         
   //        // Cập nhật state albumData với dữ liệu từ API
   //        setAlbumData(response.data);
   //      } catch (error) {
   //        // Xử lý lỗi
   //      }
   //    };
  
   //    fetchAlbumData();
   //  }, []);
   const data = [
      {
         image: Destination1,
         title: "Singapore",
         subTitle: "Singapore, officialy thr Republic of Singapore, is a",
         cost: "38,800",
         duration: "Approx 2 night trip",
      },
      {
         image: Destination2,
         title: "Thailand",
         subTitle: "Thailand is a Southeast Asia country. It's known for",
         cost: "54,200",
         duration: "Approx 2 night trip",
      },
      {
         image: Destination3,
         title: "Paris",
         subTitle: "Paris, France's capital, is a major European city and a",
         cost: "45,500",
         duration: "Approx 2 night trip",
      },
      {
         image: Destination4,
         title: "New Zealand",
         subTitle: "New Zealand is an island country in the",
         cost: "24,100",
         duration: "Approx 1 night trip",
      },
      {
         image: Destination5,
         title: "Bora Bora",
         subTitle: "Bora Bora is a small South Pacific island northwest of",
         cost: "95,400",
         duration: "Approx 2 night 2 day trip",
      },
      {
         image: Destination6,
         title: "London",
         subTitle: "London, the capital of England and the United",
         cost: "38,800",
         duration: "Approx 3 night 2 day trip",
      },
   ];

   const packages = ["The Weekend Break", "The Package Holiday", "The Group Tour", "Long Term Slow Travel"];

   return (
      <>
      <section id="recommendation" className="recommendation">
         <div className="title">
            <h1>Recommend</h1>
            <div className="CategoryBar">
               <ul>
                  {packages.map((pkg, index) => {
                     return (
                        <li key={index} className={active === index + 1 ? "Active" : ""} onClick={() => setActive(index + 1)}>
                           {pkg}
                        </li>
                     );
                  })}
               </ul>
            </div>
         </div>

      <div className="recommendationBox">
        {data.map((item, index) => {
          return(
          <Link key={index} to={`/album/${item.title}`} className="box">
              <div className="image">
                <img src={item.image} alt="image" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.subTitle}</p>

                     <div className="price">
                        <div className="icon-img">
                           <img src={info1} alt="image" />
                           <img src={info2} alt="image" />
                           <img src={info3} alt="image" />
                        </div>

                        <p>${item.cost}</p>
                     </div>

              <div className="details">
                <p>1500 kms</p>
                <p>{item.duration}</p>
              </div>
            
          </Link>);
        })}
      </div>

      {albumData && (
        <div>
          <h1>Album</h1>
          <div key={albumData._id}>
            {/* Hiển thị thông tin album */}
            <h2>{albumData.nameAlbum}</h2>
            <p>{albumData.vacation}</p>
            {/* Hiển thị các hình ảnh từ album */}
            {albumData.images.map((image, index) => (
              <img key={index} src={image} alt="image" />
            ))}
          </div>
        </div>
      )}
    </section>
    </>
  );
}

export default Vacation;
