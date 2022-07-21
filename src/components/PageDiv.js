import { Link } from "react-router-dom";
const PageDiv = ({ page }) => {
  return (
    <div
      className="pageDiv-container"
      style={{ backgroundImage: `url(${page.attributes.imageURL})`, backgroundSize: "cover" }}>
      <h3>{page.attributes.title}</h3>
      <Link
        target="_blank"
        to={{
          pathname: `/landing/${page.attributes.uniqid}`,
          state: page,
        }}>
        {" "}
        <h3 className="link-enter"> ENTER</h3>
      </Link>
      <h3>contacts</h3>
      <div>
        <p>created </p>
        <p> {new Date(page.attributes.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};
export default PageDiv;
