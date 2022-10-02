import loading from "../assets/images/loading.gif";
const Spinner = () => {
  return (
    <div className="spinner" style={{ marginTop: "1rem" }}>
      <img src={loading} alt="spinner" />
    </div>
  );
};
export default Spinner;
