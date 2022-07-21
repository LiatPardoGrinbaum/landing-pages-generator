import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "../context/MyContext";
import API from "../Api/API";

const ContactsPage = (props) => {
  const { spinner, setSpinner } = useContext(MyContext);
  const location = document.URL;
  const [error, setError] = useState(null);
  const [landingData, setLandingData] = useState({});
  const [contacts, setContacts] = useState([]);
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
        setSpinner(false);
      };
      getData();
    } catch (err) {
      console.log(err);
      setError(err.response.data.error.message);
    }
  }, []);
  // console.log(props.match.params.id);

  const insertContacts = () => {
    return contacts.map((contact, id) => {
      return (
        <div key={id} className="contact-row">
          <div className="div-num">{id + 1}</div>
          <div>{contact.attributes.name}</div>
          <div>{contact.attributes.email}</div>
          <div>{contact.attributes.phone}</div>
        </div>
      );
    });
  };
  return (
    <div className="contacts-container">
      <Header />
      <h1>Page's Contacts</h1>
      <h3>Page name:</h3>

      <Link
        target="_blank"
        to={{
          pathname: `/landing/${landingData.id}`,
        }}>
        {Object.keys(landingData).length !== 0 && (
          <h3>
            <span>{landingData.attributes.title}</span>
          </h3>
        )}
      </Link>
      <div className="contacts-table">
        <div className="contact-first-row">
          <div className="div-num">Contact no.</div>
          <div>name</div>
          <div>email</div>
          <div>phone</div>
        </div>
        {contacts.length !== 0 && insertContacts()}
      </div>
    </div>
  );
};
export default ContactsPage;
