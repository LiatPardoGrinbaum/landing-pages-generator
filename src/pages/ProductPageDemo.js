import { useState } from "react";
// import DateCountdown from "react-date-countdown-timer";

const ProductPageDemo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");

  const onHandleSumbit = async (e) => {
    //just demo
    e.preventDefault();
    setMessage("We've got your details, thank you!");
    setName("");
    setEmail("");
    setPhone("");
  };
  return (
    <div className="demoPage-container">
      <section className="productPageDemo-top">
        <h1>Keurig K-Mini Plus Coffee Maker</h1>
      </section>
      <section className="productPageDemo-middle" style={{ backgroundColor: "white" }}>
        <div className="productPageDemo-middle-inner">
          <div>
            <img
              alt="img3"
              src={require("../assets/images/bottleproduct.jpg")}
              width="350"
              style={{ borderRadius: "2rem", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
            />{" "}
          </div>
          <div className="productPageDemo-content">
            <h1>
              Keurig K-Mini Plus Coffee Maker, Single Serve K-Cup Pod Coffee Brewer, 6 to 12 oz. Brew Size, Stores up to
              9 K-Cup Pods, Evening Teal
            </h1>
          </div>
        </div>
      </section>
      <section className="EventPageDemo-bottom" style={{ backgroundColor: " rgb(189, 173, 173)" }}>
        <div className="demoform-contacts" style={{ backgroundColor: " rgba(255, 255, 255, 0.449)" }}>
          <h1>Contact us</h1>
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
            <label htmlFor="number">email:</label>
            <input
              type="email"
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
            <button className="contactBtn" type="submit">
              send
            </button>
          </form>
          {message && <p style={{ color: "green" }}>{message}</p>}
        </div>
      </section>
    </div>
  );
};

export default ProductPageDemo;
