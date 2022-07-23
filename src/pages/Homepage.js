import { Link } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import { useContext } from "react";
import Header from "../components/Header";
const Homepage = () => {
  const { loggedUser } = useContext(MyContext);
  return (
    <div className="homepage">
      <Header />
      <div className="main-homepage">
        {!loggedUser ? (
          <>
            {" "}
            <h1>Welcome to the land of pages</h1>
            <h2>Create a wonderfull landing page for any purpose.</h2>
            <h2>It's free and easy. </h2>
          </>
        ) : (
          <>
            {" "}
            <h1>Great, you're in!</h1>
            <h2>{`Welcome, ${loggedUser.username}`}</h2>
            <h2>Let's start creating your desired page.</h2>
            <Link to="/create">
              <button>Create a new landing page</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;
