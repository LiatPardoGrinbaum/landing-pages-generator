import Header from "../components/Header";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "../context/MyContext";
import Spinner from "../components/Spinner";
import ContactRow from "../components/ContactRow";
import API from "../Api/API";
//! need to change contact form rows for eact case (I only did it for job. left: events, product)!//
const ContactsPage = (props) => {
  const { spinner, setSpinner } = useContext(MyContext);
  const location = document.URL;
  const [error, setError] = useState(null);
  const [landingData, setLandingData] = useState({});
  const [contacts, setContacts] = useState([]);
  //for updating
  const [contactUpdteMode, setContactUpdteMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  useEffect(() => {
    setSpinner(true);
    setError(null);
    try {
      const getData = async () => {
        //get current landing page
        const { data } = await API.get(`/landings?filters[id]=${location.split("/landing/")[1]}`);
        setLandingData(data.data[0]);
        //get all landing page's contacts
        const response = await API.get(`/contacts?filters[landingID]=${data.data[0].attributes.uniqid}`, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        setContacts(response.data.data);

        console.log(response.data.data);
        setSpinner(false);
      };
      getData();
    } catch (err) {
      console.log(err);
      setError(err.response.data.error.message);
      setSpinner(false);
    }
  }, [location, setSpinner]);
  // console.log(props.match.params.id);

  console.log(name);
  const insertContacts = () => {
    return contacts.map((contact, id) => {
      return (
        <React.Fragment key={id}>
          <ContactRow
            contact={contact}
            id={id}
            contactUpdteMode={contactUpdteMode}
            setContactUpdteMode={setContactUpdteMode}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            note={note}
            setNote={setNote}
          />
        </React.Fragment>
      );
    });
  };
  return (
    <div className="contacts-container">
      <Header />
      <h1>Page's Contacts</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {spinner && <Spinner />}
      <h3>Page name:</h3>

      <Link
        target="_blank"
        to={{
          pathname: `/landing/${landingData.id}`,
        }}>
        {Object.keys(landingData).length !== 0 && (
          <h3>
            <span className="span-link">{landingData.attributes.shortDesc}</span>
          </h3>
        )}
      </Link>
      <div className="contacts-table">
        <div className="contact-first-row">
          <div>action</div>
          <div className="div-num">Contact no.</div>
          <div>name</div>
          <div>email</div>
          <div>phone</div>
          <div>notes</div>
        </div>
        {contacts.length !== 0 && insertContacts()}
      </div>
    </div>
  );
};
export default ContactsPage;
