import { useContext, useState } from "react";
import API from "../Api/API";
import { MyContext } from "../context/MyContext";
// import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Header from "../components/Header";
import Spinner from "../components/Spinner";

const Register = () => {
  const { loggedUser, setLoggedUser, setToken, setSpinner, spinner } = useContext(MyContext);
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const onHandleSumbit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const newUser = {
      username,
      email,
      password,
    };
    try {
      const { data } = await API.post("/auth/local/register", newUser);
      setEmail("");
      setName("");
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
        <h1> Sign Up</h1>
        <hr></hr>
        <form onSubmit={onHandleSumbit}>
          <input
            type="text"
            id="username"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button className="login-btn">Create a new account</button>
        </form>

        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};

export default Register;
