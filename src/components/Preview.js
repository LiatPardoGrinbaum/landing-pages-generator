const Preview = ({ initialState, image, contentImage }) => {
  console.log(initialState.editorContent);
  return (
    <div className="landing-preview">
      <h3>{initialState.template}</h3>
      {initialState.template === "events" || initialState.template === "product" ? (
        <>
          {" "}
          <section
            className={initialState.template === "events" ? "preview-top" : "preview-top-product"}
            style={{ backgroundImage: `url(${image})` }}>
            <h3 style={{ color: initialState.titleColor, width: "100%", background: " rgba(255, 249, 249, 0.484)" }}>
              {initialState.title}
            </h3>
            <h4
              style={{
                color: initialState.subTitleColor,
                width: "100%",
                background: " rgba(255, 249, 249, 0.484)",
              }}>
              {initialState.subTitle}
            </h4>
          </section>
          <section className="preview-middle" style={{ background: initialState.contentBackgroundColor }}>
            <div className="preview-middle-inner">
              {contentImage && <img src={contentImage} height="100" alt="contentimg" />}
              <div dangerouslySetInnerHTML={{ __html: initialState.editorContent }} />
            </div>
          </section>
          <section className="preview-bottom" style={{ background: initialState.formBackgroundColor }}>
            {initialState.formBackgroundColor && (
              <div className="preview-contact-form">
                <p>contact</p> <p>form</p>
              </div>
            )}
          </section>{" "}
        </>
      ) : (
        <>
          <section className="preview-top-job" style={{ background: initialState.jobTopSectionColor }}>
            <h3 style={{ color: initialState.titleColor, width: "100%", background: " rgba(255, 249, 249, 0.484)" }}>
              {initialState.title}
            </h3>
          </section>
          <section className="job-preview-middle" style={{ background: initialState.contentBackgroundColor }}>
            {initialState.contentBackgroundColor && (
              <div className="job-preview-middle-inner">
                <div className="jobDescDiv" style={{ background: initialState.jobDescColor }}>
                  job description
                </div>
                <div className="preview-contact-form">
                  <p>contact</p> <p>form</p>
                </div>
              </div>
            )}
          </section>
          <section className="job-preview-bottom" style={{ background: initialState.bottomSectionColor }}>
            <h5 style={{ color: initialState.bottomSectionTextColor }}>{initialState.bottomSectionText}</h5>
          </section>
        </>
      )}
    </div>
  );
};
export default Preview;
