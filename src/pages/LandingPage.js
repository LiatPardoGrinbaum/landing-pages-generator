import { useEffect, useState, useContext } from "react";
import { MyContext } from "../context/MyContext";
import API from "../Api/API";
import Spinner from "../components/Spinner";

const LandingPage = () => {
  const { loggedUser, spinner, setSpinner } = useContext(MyContext);
  const location = document.URL;
  console.log(location.split("/landing/")[1]);
  const [landingData, setLandingData] = useState({});
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSpinner(true);
    setError(null);
    try {
      const getData = async () => {
        const { data } = await API.get(`/landings?filters[id]=${location.split("/landing/")[1]}`);
        setLandingData(data.data[0].attributes);
        setSpinner(false);
      };
      getData();
    } catch (err) {
      console.log(err);
      setError(err.response.data.error.message);
    }
  }, []);

  const onHandleSumbit = async (e) => {
    e.preventDefault();
    const newContact = {
      name,
      email,
      phone,
      landingID: landingData.uniqid,
    };
    try {
      await API.post("/contacts", { data: newContact });
      setName("");
      setEmail("");
      setPhone("");
      setMessage("Your form has been sent successfully!");
    } catch (err) {
      console.log(err);
      setError(err.response.data.error.message);
    }
  };
  console.log(landingData);
  return (
    <div className="landingPage-container">
      {error && <div style={{ color: "red" }}>{error}</div>}
      {spinner && <Spinner />}
      <section className="section-top" style={{ backgroundImage: `url(${landingData.imageURL})` }}>
        <h1 style={{ color: landingData.titleColor }}>{landingData.title}</h1>
      </section>

      <section className="section-middle" style={{ backgroundColor: landingData.contentBackgroundColor }}>
        {" "}
        <div dangerouslySetInnerHTML={{ __html: landingData.editorContent }} />
      </section>
      <section className="section-bottom" style={{ backgroundColor: landingData.formBackgroundColor }}>
        <div className="form-contacts">
          <h1>Contact us</h1>
          <form onSubmit={onHandleSumbit}>
            <label htmlFor="name">Enter your name:</label>
            <input
              type="text"
              id="name"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label htmlFor="email">Enter your email:</label>
            <input
              type="text"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="phone">Enter main page phone:</label>
            <input
              type="text"
              id="phone"
              placeholder="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            {message && <p style={{ color: "green" }}>{message}</p>}
            <button className="contactBtn" type="submit">
              send
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
export default LandingPage;

// <p>{props.location.state.attributes.title}</p>
