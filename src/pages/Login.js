import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import API from "../Api/API";
import { Redirect } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import Header from "../components/Header";
import Spinner from "../components/Spinner";

const Login = () => {
  const { loggedUser, setLoggedUser, setToken, setSpinner, spinner } = useContext(MyContext);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const onHandleSumbit = async (e) => {
    setError("");
    e.preventDefault();
    setSpinner(true);
    const user = {
      identifier,
      password,
    };
    try {
      const { data } = await API.post("/auth/local", user);
      setIdentifier("");
      setPassword("");
      localStorage.setItem("token", JSON.stringify(data.jwt));
      localStorage.setItem("user", JSON.stringify(data.user));
      setLoggedUser(data.user);
      setToken(data.jwt);
      setSpinner(false);
    } catch (err) {
      console.log(err);
      setError(err.response.data.error.message);
      setSpinner(false);
    }
  };

  if (loggedUser) {
    return <Redirect to="/" />;
  }
  if (spinner) return <Spinner />;
  return (
    <div className="login-register-container">
      <Header />
      <div className="form-container">
        <h1>Login</h1>
        <hr></hr>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <form className="login-form" onSubmit={onHandleSumbit}>
          <input
            type="text"
            id="identifier"
            placeholder="email or username"
            onChange={(e) => {
              setIdentifier(e.target.value);
            }}
            value={identifier}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <button className="login-btn">Sign In</button>
        </form>
        <p className="sign-up-link">
          Not a member? <NavLink to="/register">Sign up</NavLink>, it's free.
        </p>
        <br></br>
        <div style={{ padding: "0.2rem", backgroundColor: "rgba(179, 241, 202, 0.34)", borderRadius: "0.5rem" }}>
          <h5>
            For example, log in with: <br></br>
            <span>username:</span>
            <span style={{ color: "green" }}>ella1 </span>
            <span> password:</span>
            <span style={{ color: "green" }}>ella1234</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Login;
