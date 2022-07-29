import React, { useState } from "react";
import API from "../Api/API";

const ContactRow = ({ contact, id, landingData, setContacts, contacts, handleDelete }) => {
  const [contactUpdteMode, setContactUpdteMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [guestsNum, setGuestsNum] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [currentId, setCurrentId] = useState("");
  // const [error, setError] = useState(null);
  // const [initialContactState, setInitialContactState] = useState({});

  const onEditClick = () => {
    // setCurrentId(e.target.value);
    setCurrentId(id);
    setContactUpdteMode(true);
    setName(contact.attributes.name);
    setEmail(contact.attributes.email);
    setPhone(contact.attributes.phone);
    setNote(contact.attributes.note);
    setGuestsNum(contact.attributes.number);
  };

  //*Should i move it to parent? :
  const onConfirmClick = async () => {
    setCurrentId("");
    setContactUpdteMode(false);
    const updatedContact = { ...contact, name, email, phone, note, number: guestsNum };
    try {
      await API.put(
        `/contacts/${contact.id}`,
        { data: updatedContact },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );

      console.log("lol");
      const updatedContacts = contacts.map((contactItem) =>
        contactItem.id === contact.id ? updatedContact : contactItem
      );
      console.log("updatedContacts", updatedContacts);
      setContacts(updatedContacts); //!render on parent page not working.. maybe I should move it to the parent...
    } catch (err) {
      console.log(err);
    }
  };
  // const onUpdateClick = () => {};
  console.log(contactUpdteMode);
  return (
    <div className="table-container" key={id}>
      <div className="div-num-vertical">{id + 1}</div>

      <div className="contact-row">
        <div>
          {currentId === id ? (
            <>
              <button onClick={onConfirmClick}>confirm</button>
              <button onClick={() => handleDelete(contact)}>delete</button>
            </>
          ) : (
            <>
              {/* //!why is disabled not working? */}
              <button onClick={onEditClick} disabled={contactUpdteMode}>
                edit
              </button>
              <button disabled={contactUpdteMode} onClick={() => handleDelete(contact)}>
                delete
              </button>
            </>
          )}
        </div>

        <div className="div-num">{id + 1}</div>
        <div>
          <span className="span-cell">Name:</span>

          <input
            className={currentId === id ? "input-updatemode" : "noneclassname"}
            type="text"
            value={currentId === id ? name : contact.attributes.name}
            onChange={(e) => setName(e.target.value)}
            disabled={!contactUpdteMode}></input>
          {/* {contact.attributes.name} */}
        </div>
        {landingData.attributes.template === "events" ? (
          <div>
            <span className="span-cell">Guests:</span>
            <input
              className={currentId === id ? "input-updatemode" : "noneclassname"}
              type="number"
              value={currentId === id ? guestsNum : contact.attributes.number}
              onChange={(e) => setGuestsNum(e.target.value)}
              disabled={!contactUpdteMode}></input>
          </div>
        ) : (
          <div>
            <span className="span-cell">Email:</span>
            <input
              className={currentId === id ? "input-updatemode" : "noneclassname"}
              type="text"
              value={currentId === id ? email : contact.attributes.email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!contactUpdteMode}></input>
          </div>
        )}

        <div>
          <span className="span-cell">Phone:</span>
          <input
            className={currentId === id ? "input-updatemode" : "noneclassname"}
            type="text"
            value={currentId === id ? phone : contact.attributes.phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={!contactUpdteMode}></input>
        </div>
        <div>
          <span className="span-cell-textarea">Note:</span>
          {currentId === id ? (
            <>
              <textarea
                className="input-updatemode"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={!contactUpdteMode}></textarea>
            </>
          ) : (
            <p style={{ fontSize: "0.8rem" }}>
              {!readMore ? contact.attributes.note.substring(0, 15) + "..." : contact.attributes.note}
              <span
                onClick={() => setReadMore(!readMore)}
                style={{ color: "blue", fontWeight: "bold", fontSize: "0.8rem", cursor: "pointer" }}>
                read more
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ContactRow;
