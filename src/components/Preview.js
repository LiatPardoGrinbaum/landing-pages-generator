const Preview = ({ shortDesc, image }) => {
  return (
    <div className="landing-preview">
      <div>{shortDesc}</div>
      <img src={image} width="200" />
    </div>
  );
};
export default Preview;
