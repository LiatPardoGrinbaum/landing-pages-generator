import { useContext, useState } from "react";
import API from "../Api/API";
import { MyContext } from "../context/MyContext";
// import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

const Register = () => {
  const { loggedUser, setLoggedUser, setToken } = useContext(MyContext);
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const onHandleSumbit = async (e) => {
    e.preventDefault();

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
      localStorage.setItem("user", JSON.stringify(data));
      setLoggedUser(data);
      setToken(data.jwt);
    } catch (err) {
      console.log(err);
      setError(err.response.data.error.message);
    }
  };
  if (loggedUser) {
    console.log(loggedUser);
    return <Redirect to="/" />;
  }
  return (
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
  );
};

export default Register;
