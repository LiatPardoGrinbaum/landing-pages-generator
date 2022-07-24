import { useState } from "react";
// import DateCountdown from "react-date-countdown-timer";

const JobPageDemo = () => {
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
      <section className="JobPageDemo-top" style={{ backgroundColor: " rgb(65, 15, 220)" }}>
        <h1 className="jobOffer-h1" style={{ color: "white" }}>
          Job offer!
        </h1>
      </section>
      <section className="jobPageDemo-middle" style={{ backgroundColor: "rgb(65, 65, 214)" }}>
        <div className="jobPageDemo-middle-inner">
          <div
            className="jobPageDemo-content"
            style={{ color: "darkblue", boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
            {/* here will be the text from the editor */}
            <h2 style={{ textAlign: "center" }}>Full Stack Developer</h2>
            <p>
              We are looking for a Full Stack Developer who will be responsible for designing, developing, and
              implementing frontend and backend software for a complex web application Translating software requirements
              into working and maintainable solutions within the existing application frameworks.
            </p>
            <h3>Responsibilities:</h3>
            <p>
              Implementing the product's lifecycle: Design, development, quality, deployment, and maintenance.
              Developing and adhering to best practices for developing applications Continuously contribute to team
              performance improvement and collaboration. Providing improvements to the product(s) being supported.
              Actively participating in release and sprint planning, artifact creation, sprint testing, regression
              testing, demonstrations, retrospectives, and solution releases. Supporting release planning with
              conceptual design and development/refinement of software engineering guidelines Writing technical
              documentation.
            </p>
            <h3>Requirements:.</h3>
            <p>
              At least seven (7) years of related technical experience, with software design, development, and
              implementation in a Windows environment Experience with front-end technologies and single-page
              applications (Angular, JavaScript, TypeScript) Familiarity with XML, JSON, PowerShell, batch scripting.
              Experience with agile and/or DevOps processes and tools (e.g., JIRA, Confluence) Ability to translate
              software requirements into working and maintainable solutions within the existing application frameworks.
              Excellent knowledge of relational databases (Oracle, PostgreSQL), SQL, and PL/SQL Excellent skills in DB
              schema design and SQL development.
            </p>
          </div>

          <div>
            <div className="demoform-contacts" style={{ backgroundColor: " rgba(255, 255, 255, 0.449)" }}>
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
          </div>
        </div>
      </section>

      <section className="jobPageDemo-bottom" style={{ backgroundColor: " rgb(65, 15, 220)" }}>
        &copy; company's name &copy;
      </section>
    </div>
  );
};

export default JobPageDemo;
