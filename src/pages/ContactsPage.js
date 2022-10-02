import Header from "../components/Header";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "../context/MyContext";
import Spinner from "../components/Spinner";
import ContactRow from "../components/ContactRow";
import API from "../Api/API";

const ContactsPage = (props) => {
  const { spinner, setSpinner } = useContext(MyContext);
  const location = document.URL;
  const [error, setError] = useState(null);
  const [landingData, setLandingData] = useState({});
  const [contacts, setContacts] = useState([]);
  //for updating

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

        // console.log(response.data.data);
        setSpinner(false);
      };
      getData();
    } catch (err) {
      console.log(err);
      setError(err.response.data.error.message);
      setSpinner(false);
    }
  }, [location, setSpinner]);

  // useEffect(() => {
  //   console.log(contacts);
  // }, [contacts]);
  // // console.log(props.match.params.id);

  const handleDelete = async (contact) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      await API.delete(`/contacts/${contact.id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const filteredContacts = contacts.filter((contactrow) => contactrow.id !== contact.id);
      setContacts(filteredContacts);
    }
  };
  console.log(contacts);
  // console.log("landingData", landingData);
  const insertContacts = () => {
    return contacts.map((contact, id) => {
      return (
        <React.Fragment key={id}>
          <ContactRow
            contact={contact}
            id={id}
            landingData={landingData}
            setContacts={setContacts}
            contacts={contacts}
            handleDelete={handleDelete}
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
        className="title-contact-link"
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
          {landingData.attributes && <div>{landingData.attributes.template === "events" ? "guests" : "email"}</div>}

          <div>phone</div>
          <div>notes</div>
          <div>activity</div>
        </div>
        {contacts.length !== 0 && insertContacts()}
      </div>
    </div>
  );
};
export default ContactsPage;
