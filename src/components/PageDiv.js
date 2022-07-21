const PageDiv = ({ page }) => {
  return (
    <div
      className="pageDiv-container"
      style={{ backgroundImage: `url(${page.attributes.imageURL})`, backgroundSize: "cover" }}>
      <h3>{page.attributes.title}</h3>
      <div>
        <p>created </p>
        <p> {new Date(page.attributes.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};
export default PageDiv;
