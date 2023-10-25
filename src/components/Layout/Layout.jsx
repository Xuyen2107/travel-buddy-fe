import Header from "../Header/Header";
import Route from "../../routes/Route";
import "./layout.module.css";

const Layout = () => {
   return (
      <div className="layout">
         <Header />
         <Route />
      </div>
   );
};

export default Layout;
