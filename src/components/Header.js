import { NavLink } from "react-router-dom";
// import {  useLocation } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import { useContext } from "react";

const Header = () => {
  const { loggedUser, setLoggedUser } = useContext(MyContext);
  // const path = useLocation().pathname;
  // console.log(path);
  const onClickLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setLoggedUser(null);
  };

  return (
    <div className="Header">
      <div className="navbar-inner">
        <div className="navbar-left navbar-link">
          <NavLink to="/" exact={true}>
            Home
          </NavLink>
        </div>
        <div className="navbar-right navbar-link">
          {!loggedUser ? (
            <>
              <NavLink to="/login" className="link" exact={true}>
                Login
              </NavLink>
              <NavLink to="/register" className="link" exact={true}>
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/mypages" className="link" exact={true}>
                My Pages
              </NavLink>
              <NavLink to="/create" className="link" exact={true}>
                Add Page
              </NavLink>
              <NavLink to="/register" className="link" exact={true} onClick={onClickLogout}>
                Logout
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
