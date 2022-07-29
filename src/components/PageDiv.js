import { Link } from "react-router-dom";

// import React, { useContext } from "react";
// import { MyContext } from "../context/MyContext";

const PageDiv = ({ page, handleDelete }) => {
  return (
    <div
      className="pageDiv-container"
      style={{ backgroundImage: `url(${page.attributes.imageURL})`, backgroundSize: "cover" }}>
      <h3>{page.attributes.shortDesc}</h3>
      <Link
        target="_blank"
        to={{
          pathname: `/landing/${page.id}`,
        }}>
        {" "}
        <h3 className="link-enter"> ENTER</h3>
      </Link>
      <Link to={{ pathname: `/contacts/landing/${page.id}`, state: page }}>
        <h3 className="link-contacts">contacts</h3>
      </Link>
      <div className="pageDiv-bottom">
        {/*// need to add: delete + update */}
        <p>created </p>
        <p> {new Date(page.attributes.createdAt).toLocaleString()}</p>
        <div className="landingButtons">
          <Link to={`update/${page.id}`}>
            <button>Update</button>
          </Link>
          <button onClick={() => handleDelete(page)}>Delete</button>
        </div>
      </div>
    </div>
  );
};
export default PageDiv;
