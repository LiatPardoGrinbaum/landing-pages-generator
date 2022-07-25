import { useState } from "react";

const ContactTable = ({
  contact,
  id,
  setContactUpdteMode,
  contactUpdteMode,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  note,
  setNote,
}) => {
  const [readMore, setReadMore] = useState(false);
  const onUpdateClick = () => {
    if (contactUpdteMode === false) {
      setContactUpdteMode(true);
      console.log("contact", contact.attributes.name);
      setName(contact.attributes.name);
      setEmail(contact.attributes.email);
      setPhone(contact.attributes.phone);
      setNote(contact.attributes.note);
    } else {
      setContactUpdteMode(false);
    }
  };
  // const onUpdateClick = () => {};

  return (
    <div className="table-container" key={id}>
      <div className="div-num-vertical">{id + 1}</div>
      <div className="contact-row">
        <div>
          <button onClick={onUpdateClick}>{contactUpdteMode ? "Confirm" : " Edit"}</button>
          <button>delete</button>
        </div>

        <div className="div-num">{id + 1}</div>
        <div>
          <span className="span-cell">name:</span>
          <input
            className={contactUpdteMode ? "input-updatemode" : "noneclassname"}
            type="text"
            value={contactUpdteMode ? name : contact.attributes.name}
            onChange={(e) => setName(e.target.value)}
            disabled={!contactUpdteMode}></input>
          {/* {contact.attributes.name} */}
        </div>
        <div>
          {" "}
          <span className="span-cell">email:</span>
          <input
            className={contactUpdteMode ? "input-updatemode" : "noneclassname"}
            type="text"
            value={contactUpdteMode ? email : contact.attributes.email}
            onChange={(e) => setName(e.target.value)}
            disabled={!contactUpdteMode}></input>
        </div>
        <div>
          <span className="span-cell">phone:</span>
          <input
            className={contactUpdteMode ? "input-updatemode" : "noneclassname"}
            type="text"
            value={contactUpdteMode ? phone : contact.attributes.phone}
            onChange={(e) => setName(e.target.value)}
            disabled={!contactUpdteMode}></input>
        </div>
        <div>
          <span className="span-cell">note:</span>
          {contactUpdteMode ? (
            <>
              <textarea
                className={contactUpdteMode ? "input-updatemode" : "noneclassname"}
                type="text"
                value={contactUpdteMode ? note : contact.attributes.note}
                onChange={(e) => setName(e.target.value)}
                disabled={!contactUpdteMode}></textarea>
            </>
          ) : (
            <p>
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
export default ContactTable;
