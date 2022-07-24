import { useState } from "react";
// import DateCountdown from "react-date-countdown-timer";

const EventPageDemo = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");

  const onHandleSumbit = async (e) => {
    //just demo
    e.preventDefault();
    setMessage("We've got your details, thank you!");
    setName("");
    setNumber("");
    setPhone("");
  };
  return (
    <div className="demoPage-container">
      <section className="EventPageDemo-top">
        <h1>Or & Mor</h1>
        <h2>Are getting married!</h2>
        {/*        <DateCountdown dateTo="January 01, 2023 00:00:00 GMT+03:00" callback={() => alert("Hello")} /> */}
      </section>
      <section className="EventPageDemo-middle" style={{ backgroundColor: "rgb(211, 186, 211)" }}>
        <div>
          <img
            src={require("../assets/images/weddingdemo2.jpeg")}
            height="300"
            style={{ borderRadius: "2rem", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
          />{" "}
        </div>
        <div className="EventPageDemo-content">
          <h1>You are invited to our wedding!</h1>
          <h2>Save the date! 25.10.22</h2>
          <h2>We would like to see you among our guests</h2>
          <h2>and appreciate yur approval in the form below.</h2>
          <h3>Or&Mor</h3>
        </div>
      </section>
      <section className="EventPageDemo-bottom" style={{ backgroundColor: " rgb(181, 225, 223)" }}>
        <div className="demoform-contacts">
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

export default EventPageDemo;
