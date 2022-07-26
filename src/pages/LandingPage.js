import { useEffect, useState, useContext } from "react";
import { MyContext } from "../context/MyContext";
import API from "../Api/API";
import Spinner from "../components/Spinner";

const LandingPage = () => {
  const { spinner, setSpinner } = useContext(MyContext);
  const location = document.URL;
  console.log(location.split("/landing/")[1]);
  const [landingData, setLandingData] = useState({});
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState("");

  const [note, setNote] = useState("");

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
  }, [location, setSpinner]);

  const onHandleSumbit = async (e) => {
    e.preventDefault();
    let newContact;
    if (landingData.template === "job") {
      newContact = {
        name,
        email,
        phone,
        note,
        landingID: landingData.uniqid,
      };
    } else if (landingData.template === "events") {
      newContact = {
        name,
        phone,
        number,
        note,
        landingID: landingData.uniqid,
      };
    } else if (landingData.template === "product") {
      newContact = {
        name,
        email,
        phone,

        note,
        landingID: landingData.uniqid,
      };
    }
    try {
      await API.post("/contacts", { data: newContact });
      setName("");
      setEmail("");
      setPhone("");
      setNote("");
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
      {landingData.template !== "job" && (
        <>
          <section
            className={landingData.template === "events" ? "section-top-events" : "section-top-product"}
            style={{ backgroundImage: `url(${landingData.imageURL})` }}>
            <h1 style={{ color: landingData.titleColor }}>{landingData.title}</h1>
            <h2 style={{ color: landingData.subTitleColor }}>{landingData.subTitle}</h2>
          </section>

          <section className="section-middle" style={{ backgroundColor: landingData.contentBackgroundColor }}>
            <div>
              <img
                src={landingData.imageURLsmall}
                height="300"
                style={{ borderRadius: "2rem", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
              />{" "}
            </div>
            <div dangerouslySetInnerHTML={{ __html: landingData.editorContent }} />
          </section>
          <section className="section-bottom" style={{ backgroundColor: landingData.formBackgroundColor }}>
            <div className="form-contacts">
              <h1>Contact us</h1>
              <form onSubmit={onHandleSumbit}>
                <label htmlFor="name">Full name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                {landingData.template === "product" && (
                  <>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      id="email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </>
                )}

                <label htmlFor="phone">Phone number:</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                {landingData.template === "events" && (
                  <>
                    <label htmlFor="number">Number of guests:</label>
                    <input
                      type="number"
                      id="number"
                      placeholder="number"
                      value={number}
                      onChange={(e) => {
                        setNumber(e.target.value);
                      }}
                    />
                  </>
                )}

                <label htmlFor="phone">Personal note:</label>
                <textarea
                  type="text"
                  id="note"
                  placeholder="note"
                  rows="7"
                  cols="40"
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                />
                {message && <p style={{ color: "green" }}>{message}</p>}
                <button className="contactBtn" type="submit">
                  send
                </button>
              </form>
            </div>
          </section>
        </>
      )}
      {landingData.template === "job" && (
        <>
          <section className="JobPage-top" style={{ backgroundColor: landingData.jobTopSectionColor }}>
            <h1 className="jobOffer-h1" style={{ color: landingData.title }}>
              Job offer!
            </h1>
          </section>
          <section className="jobPage-middle" style={{ backgroundColor: landingData.contentBackgroundColor }}>
            <div className="jobPage-middle-inner">
              <div dangerouslySetInnerHTML={{ __html: landingData.editorContent }} />
              <div>
                <div className="form-contacts">
                  <h1>Apply</h1>
                  <form onSubmit={onHandleSumbit}>
                    <label htmlFor="name">Full name:</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      id="email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <label htmlFor="phone">Phone number</label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="phone"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                    <label htmlFor="note">Personal note:</label>
                    <textarea
                      type="text"
                      id="note"
                      placeholder="note"
                      rows="7"
                      cols="40"
                      value={note}
                      onChange={(e) => {
                        setNote(e.target.value);
                      }}
                    />
                    <button className="contactBtn" type="submit">
                      send
                    </button>
                  </form>
                  {message && <p style={{ color: "green" }}>{message}</p>}
                </div>
              </div>
            </div>
          </section>

          <section
            className="jobPage-bottom"
            style={{ backgroundColor: landingData.bottomSectionColor, color: landingData.bottomSectionTextColor }}>
            {landingData.bottomSectionText}
          </section>
        </>
      )}
    </div>
  );
};
export default LandingPage;

// <p>{props.location.state.attributes.title}</p>
