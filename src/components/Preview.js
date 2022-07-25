const Preview = ({
  title,
  image,
  template,
  subTitle,
  titleColor,
  subTitleColor,
  editorContent,
  contentImage,
  contentBackgroundColor,
  formBackgroundColor,
  jobTopSectionColor,
  jobDescColor,
  bottomSectionColor,
  bottomSectionText,
}) => {
  console.log(editorContent);
  return (
    <div className="landing-preview">
      <h3>{template}</h3>
      {template === "events" || template === "product" ? (
        <>
          {" "}
          <section
            className={template === "events" ? "preview-top" : "preview-top-product"}
            style={{ backgroundImage: `url(${image})` }}>
            <h3 style={{ color: titleColor, width: "100%", backgroundColor: " rgba(255, 249, 249, 0.484)" }}>
              {title}
            </h3>
            <h4 style={{ color: subTitleColor, width: "100%", backgroundColor: " rgba(255, 249, 249, 0.484)" }}>
              {subTitle}
            </h4>
          </section>
          <section className="preview-middle" style={{ backgroundColor: contentBackgroundColor }}>
            <div className="preview-middle-inner">
              <img src={contentImage} height="100" />
              <div dangerouslySetInnerHTML={{ __html: editorContent }} />
            </div>
          </section>
          <section className="preview-bottom" style={{ backgroundColor: formBackgroundColor }}>
            {formBackgroundColor && (
              <div className="preview-contact-form">
                <p>contact</p> <p>form</p>
              </div>
            )}
          </section>{" "}
        </>
      ) : (
        <>
          <section className="preview-top-job" style={{ backgroundColor: jobTopSectionColor }}>
            <h3 style={{ color: titleColor, width: "100%", backgroundColor: " rgba(255, 249, 249, 0.484)" }}>
              {title}
            </h3>
          </section>
          <section className="job-preview-middle" style={{ backgroundColor: contentBackgroundColor }}>
            {contentBackgroundColor && (
              <div className="job-preview-middle-inner">
                <div className="jobDescDiv" style={{ background: jobDescColor }}>
                  job description
                </div>
                <div className="preview-contact-form">
                  <p>contact</p> <p>form</p>
                </div>
              </div>
            )}
          </section>
          <section className="job-preview-bottom" style={{ background: bottomSectionColor }}>
            <h5>{bottomSectionText}</h5>
          </section>
        </>
      )}
    </div>
  );
};
export default Preview;
