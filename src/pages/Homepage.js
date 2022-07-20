import { NavLink } from "react-router-dom";
const Homepage = () => {
  return (
    <div className="Homepage">
      <div className="main-homepage">
        <h1>Welcome to the land of pages</h1>

        <h2>Create a wonderfull landing page for any purpose.</h2>
        <h2>It's free and easy. </h2>
        {/* <h3>
          <NavLink to="/login" className="link" exact={true}>
            Login
          </NavLink>
          <NavLink to="/register" className="link" exact={true}>
            Register
          </NavLink>
        </h3> */}
      </div>
    </div>
  );
};

export default Homepage;
