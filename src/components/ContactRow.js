import React, { useState } from "react";

const ContactRow = ({ contact, id }) => {
  const [contactUpdteMode, setContactUpdteMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const onEditClick = () => {
    // setCurrentId(e.target.value);
    setCurrentId(id);
    setContactUpdteMode((prev) => !prev);
    setName(contact.attributes.name);
    setEmail(contact.attributes.email);
    setPhone(contact.attributes.phone);
    setNote(contact.attributes.note);
  };
  const onConfirmClick = () => {
    setCurrentId("");
    setContactUpdteMode((prev) => !prev);
  };
  // const onUpdateClick = () => {};

  return (
    <div className="table-container" key={id}>
      <div className="div-num-vertical">{id + 1}</div>
      <div className="contact-row">
        <div>
          {currentId === id ? (
            <>
              <button onClick={onConfirmClick}>confirm</button>
              <button>delete</button>
            </>
          ) : (
            <>
              {" "}
              <button onClick={onEditClick} disabled={contactUpdteMode}>
                edit
              </button>
              <button disabled={contactUpdteMode}>delete</button>
            </>
          )}
        </div>

        <div className="div-num">{id + 1}</div>
        <div>
          <span className="span-cell">name:</span>

          <input
            className={currentId === id ? "input-updatemode" : "noneclassname"}
            type="text"
            value={currentId === id ? name : contact.attributes.name}
            onChange={(e) => setName(e.target.value)}
            disabled={!contactUpdteMode}></input>
          {/* {contact.attributes.name} */}
        </div>
        <div>
          {" "}
          <span className="span-cell">email:</span>
          <input
            className={currentId === id ? "input-updatemode" : "noneclassname"}
            type="text"
            value={currentId === id ? email : contact.attributes.email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!contactUpdteMode}></input>
        </div>
        <div>
          <span className="span-cell">phone:</span>
          <input
            className={currentId === id ? "input-updatemode" : "noneclassname"}
            type="text"
            value={currentId === id ? phone : contact.attributes.phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={!contactUpdteMode}></input>
        </div>
        <div>
          <span className="span-cell-textarea">note:</span>
          {currentId === id ? (
            <>
              <textarea
                className={currentId === id ? "input-updatemode" : "noneclassname"}
                type="text"
                value={currentId === id ? note : contact.attributes.note}
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
