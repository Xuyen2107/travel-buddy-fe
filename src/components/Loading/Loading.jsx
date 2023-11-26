import style from "./loading.module.css";

const Loading = () => {
   return (
      <div className={style.wrapper}>
         <div className={style.loading}>
            <span className={style.span} style={{ "--i": 1 }}>
               T
            </span>
            <span className={style.span} style={{ "--i": 2 }}>
               R
            </span>
            <span className={style.span} style={{ "--i": 3 }}>
               A
            </span>
            <span className={style.span} style={{ "--i": 4 }}>
               V
            </span>
            <span className={style.span} style={{ "--i": 5 }}>
               E
            </span>
            <span className={style.span} style={{ "--i": 6 }}>
               L
            </span>
            <span className={style.span} style={{ "--i": 7 }}>
               B
            </span>
            <span className={style.span} style={{ "--i": 8 }}>
               U
            </span>
            <span className={style.span} style={{ "--i": 9 }}>
               D
            </span>
            <span className={style.span} style={{ "--i": 10 }}>
               D
            </span>
            <span className={style.span} style={{ "--i": 11 }}>
               Y
            </span>
            <span className={style.span} style={{ "--i": 12 }}>
               .
            </span>
            <span className={style.span} style={{ "--i": 13 }}>
               .
            </span>
            <span className={style.span} style={{ "--i": 14 }}>
               .
            </span>
         </div>
      </div>
   );
};

export default Loading;
