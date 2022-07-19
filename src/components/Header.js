import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header">
      <div className="navbar-inner">
        <div className="navbar-left navbar-link">
          <NavLink to="/" exact={true}>
            Home
          </NavLink>
        </div>
        <div className="navbar-right navbar-link">
          <NavLink to="/login" className="link" exact={true}>
            Login
          </NavLink>
          <NavLink to="/register" className="link" exact={true}>
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
