const LandingPage = (props) => {
  return (
    <div className="landingPage-container">
      <p>{props.location.state.attributes.title}</p>
    </div>
  );
};
export default LandingPage;
