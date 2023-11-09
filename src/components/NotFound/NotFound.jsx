import { useNavigate } from "react-router-dom";
import style from "./notFound.module.css";

const NotFound = () => {
   const navigate = useNavigate();
   return (
      <div className={style.notFound}>
         <div className={style.wrapper}>
            <span className={style.title}>NOT FOUND 404</span>
            <div className={style.bottom}>
               <button
                  onClick={() => {
                     navigate(-1);
                  }}
                  className={`${style.goBack} ${style.button}`}
               >
                  Quay lại trang trước
               </button>
               <button
                  onClick={() => {
                     navigate("/");
                  }}
                  className={`${style.goHome} ${style.button}`}
               >
                  Đi đến bảng tin
               </button>
            </div>
         </div>
      </div>
   );
};

export default NotFound;
