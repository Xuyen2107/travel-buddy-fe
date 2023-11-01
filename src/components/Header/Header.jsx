import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import style from "./header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

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

const Header = () => {
   const auth = useSelector((state) => state.auth);
   console.log(123, auth);
   const dispatch = useDispatch();
   const headerRef = useRef(null);
   const menuRef = useRef(null);

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
            {auth.isLogin && (
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
                  {auth.isLogin ? (
                     <div className={style.user}>
                        <button>
                           <img className={style.img} src={auth?.user?.avatar} alt="Avatar" />
                        </button>
                        <button
                           onClick={() => {
                              dispatch(logout());
                              localStorage.removeItem("user");
                              localStorage.removeItem("accessToken");
                           }}
                        >
                           Log out
                        </button>
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
