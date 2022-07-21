import loading from "../assets/images/loading.gif";
const Spinner = () => {
  return (
    <div className="spinner">
      <img src={loading} alt="spinner" />
    </div>
  );
};
export default Spinner;
