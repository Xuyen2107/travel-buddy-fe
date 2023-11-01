import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
// import Button from "@mui/material/Button";
import style from "./header.module.css";

const navLinks = [
   {
      path: "/",
      display: "Home",
   },
   {
      path: "/about",
      display: "About",
   },
   {
      path: "/tours",
      display: "Tours",
   },
   {
      path: "/Ablum",
      display: "Ablum",
   },
];

const user = {
   _id: "653798aa1fbb8cb9e92d5ae6",
   fullName: "Phạm Hoàng Xuyên",
   userName: "xuyen123",
   email: "hoangxuyenpham30@gmail.com",
   phoneNumber: "0843461739",
   password: "$2b$10$Q3/MZEyhh/t.7CNsHSNfqun2/oWaNL50lFPGoD/j6w0zT9.wcfnny",
   createAt: {
      $date: "2023-10-24T10:10:07.459Z",
   },
   avatar: "https://res.cloudinary.com/dcgytjpvn/image/upload/v1698142500/Travel_Buddy/ilerymwkxnu3jd52s9ff.jpg",
   age: 24,
   dateOfBirth: "21/7/1999",
   describe: "I love you",
   gender: "Nam",
   updateAt: {
      $date: "2023-10-24T10:16:28.653Z",
   },
};

const Header = () => {
   const headerRef = useRef(null);
   const menuRef = useRef(null);
   const blockRef = useRef(null);
   const [isHidden, setIsHidden] = useState(false);

   const toggle = () => {
      setIsHidden(!isHidden);
   };

   const handleClickOutside = () => {
      setIsHidden(false);
   };

   useEffect(() => {
      if (!isHidden) {
         document.addEventListener("click", handleClickOutside);
      } else {
         document.removeEventListener("click", handleClickOutside);
      }

      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [isHidden]);

   const stickyHeaderFunc = () => {
      window.addEventListener("scroll", () => {
         if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            headerRef.current.classList.add(style.stickyHeader);
         } else {
            headerRef.current.classList.remove(style.stickyHeader);
         }
      });
   };

   useEffect(() => {
      stickyHeaderFunc();

      return window.removeEventListener("scroll", stickyHeaderFunc);
   });

   const toggleMenu = () => menuRef.current.classList.toggle("show_menu");

   return (
      <header className={style.header} ref={headerRef}>
         <nav className={style.wrapper}>
            {/* ========== LOGO ========== */}
            <NavLink to="/" className={style.logo}>
               Travel Buddy
            </NavLink>
            {/* ========================== */}

            {/* ========== MENU START ========== */}
            {user && (
               <div className={style.navigation} ref={menuRef} onClick={toggleMenu}>
                  <ul className={style.menu}>
                     {navLinks.map((item, idx) => (
                        <li className={style.menuItem} key={idx}>
                           <NavLink to={item.path} className={style.menuLink}>
                              {item.display}
                           </NavLink>
                        </li>
                     ))}
                  </ul>
               </div>
            )}
            {/* ================================ */}

            <div className={style.navRight}>
               <div className="nav_btns">
                  {user ? (
                     <div className={style.user}>
                        <button onClick={toggle}>
                           <img className={style.img} src={user.avatar} alt="Avatar" />
                        </button>
                        {isHidden && <div ref={blockRef} className={style.block}></div>}
                     </div>
                  ) : (
                     <NavLink to="/login" className={style.login}>
                        <i className="fa-solid fa-right-to-bracket"></i> Đăng nhập
                     </NavLink>
                  )}
               </div>

               <span className="mobile__menu" onClick={toggleMenu}>
                  <i className="ri-menu-line"></i>
               </span>
            </div>
         </nav>
      </header>
   );
};

export default Header;
