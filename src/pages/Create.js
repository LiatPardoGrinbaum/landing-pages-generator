import Header from "../components/Header";
import { useContext, useState, useRef, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import { Editor } from "@tinymce/tinymce-react";
import { v4 as uuidv4 } from "uuid";
import API from "../Api/API";
import Spinner from "../components/Spinner";
import Preview from "../components/Preview";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Create = (props) => {
  const inputRef = useRef(null);
  const editorRef = useRef(null);
  const { loggedUser, spinner, setSpinner } = useContext(MyContext);

  const [ContentFilePreview, setContentFilePreview] = useState(null);

  const [username, setUsername] = useState("");

  const [filePreview, setFilePreview] = useState("");

  const [error, setError] = useState(null);
  //for updating:
  let { id } = useParams();

  const [initialState, setInitialState] = useState({});
  useEffect(() => {
    if (loggedUser) {
      setUsername(loggedUser.username);
    }
    //for updating:
    if (id) {
      setSpinner(true);
      setError(null);
      try {
        const getData = async () => {
          const { data } = await API.get(`/landings?filters[id]=${id}`);
          console.log(data);
          setInitialState(data.data[0].attributes);
          setSpinner(false);
        };
        getData();
      } catch (err) {
        console.log(err);
        setError(err.response.data.error.message);
        setSpinner(false);
      }
    }
  }, [setUsername, loggedUser, id, setSpinner]);

  const onEditorHandleChange = () => {
    if (editorRef.current) {
      setInitialState({ ...initialState, editorContent: editorRef.current.getContent() });
    }
  };
  //another way to get the same output:
  // const onEditorHandleChange = (content, editor) => {
  //   setEditorContent(content);
  // };
  const onHandleSumbit = async (e) => {
    setError(null);
    e.preventDefault();
    setSpinner(true);
    try {
      let response1;
      let response2;

      if (initialState.template !== "job") {
        const formData = new FormData();
        formData.append("files", initialState.file);
        response1 = await API.post("/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });

        const formData2 = new FormData();
        formData2.append("files", initialState.contentFile);
        response2 = await API.post("/upload", formData2, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
      }
      let newLanding;
      // setImageURL(data[0].url);
      if (initialState.template === "job") {
        newLanding = {
          ...initialState,
          username,
          uniqid: uuidv4().slice(0, 12),
        };
      } else {
        newLanding = {
          ...initialState,
          imageURL: response1.data[0].url || "",
          imageURLsmall: response2.data[0].url || "",
          username,
          uniqid: uuidv4().slice(0, 12),
        };
      }
      if (!id) {
        await API.post(
          "/landings",
          { data: newLanding },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          }
        );
        setSpinner(false);
        alert("Your landing page was created successfuly!");
      } else {
        await API.put(
          `/landings/${id}`,
          { data: newLanding },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          }
        );
        setSpinner(false);
        alert("Your landing page was updated successfuly!");
      }

      props.history.push("/mypages");
    } catch (err) {
      console.log(err);
      setError(err.response.data.error.message);
      setSpinner(false);
    }
  };

  console.log("id", id);

  console.log("initialState", initialState);
  return (
    <div className="createPage">
      <Header />

      <h1>Create your new landing page</h1>
      <div className="create-container">
        <div className="form-create-landing">
          <form onSubmit={onHandleSumbit}>
            <label htmlFor="shortDesc">Enter a short title description (won't be shown on page):</label>
            <input
              type="text"
              id="shortDesc"
              placeholder="short description"
              value={initialState.shortDesc || ""}
              onChange={(e) => {
                setInitialState({ ...initialState, shortDesc: e.target.value });
              }}
            />
            <div className="radio-buttons">
              <label> Please select one of the following templates:</label>
              <div>
                <input
                  type="radio"
                  value="events"
                  name="events"
                  checked={initialState.template === "events" || ""}
                  onChange={() => setInitialState({ ...initialState, template: "events" })}
                />
                Events{" "}
                <Link
                  className="template-link"
                  target="_blank"
                  to={{
                    pathname: "/eventpagedemo",
                  }}>
                  {" "}
                  <span className="link-enter"> [example]</span>
                </Link>
              </div>
              <div>
                <input
                  type="radio"
                  value="product"
                  name="product"
                  checked={initialState.template === "product" || ""}
                  onChange={() => setInitialState({ ...initialState, template: "product" })}
                />
                Company's product advertising{" "}
                <Link
                  className="template-link"
                  target="_blank"
                  to={{
                    pathname: "/productpagedemo",
                  }}>
                  {" "}
                  <span className="link-enter"> [example]</span>
                </Link>
              </div>
              <div>
                <input
                  type="radio"
                  value="job"
                  name="job"
                  checked={initialState.template === "job" || ""}
                  onChange={() => setInitialState({ ...initialState, template: "job" })}
                />
                Job offer{" "}
                <Link
                  className="template-link"
                  target="_blank"
                  to={{
                    pathname: "/jobpagedemo",
                  }}>
                  {" "}
                  <span className="link-enter"> [example]</span>
                </Link>
              </div>
            </div>
            {/* //*event date- removed for now */}
            {/*         {template === "events" && (
              <div htmlFor="date">
                Enter event's date:{" "}
                <input
                  type="date"
                  id="date"
                  value={eventDate}
                  onChange={(e) => {
                    setEventDate(e.target.value);
                  }}
                />
              </div>
            )} */}

            <label htmlFor="title">Enter the main page title:</label>
            <input
              type="text"
              id="title"
              placeholder="title"
              value={initialState.title || ""}
              onChange={(e) => {
                setInitialState({ ...initialState, title: e.target.value });
              }}
            />
            <label htmlFor="title-color">Select a color for the title:</label>
            <input
              type="color"
              id="title-color"
              value={initialState.titleColor || ""}
              onChange={(e) => {
                setInitialState({ ...initialState, titleColor: e.target.value });
              }}
            />
            {initialState.template === "job" && (
              <>
                <label htmlFor="jobTopSectionColor">Select a color for the top section:</label>
                <input
                  type="color"
                  id="jobTopSectionColor"
                  value={initialState.jobTopSectionColor || ""}
                  onChange={(e) => {
                    setInitialState({ ...initialState, jobTopSectionColor: e.target.value });
                  }}
                />
              </>
            )}
            {initialState.template !== "job" && (
              <>
                <label htmlFor="subtitle">Enter sub title:</label>
                <input
                  type="text"
                  id="subtitle"
                  placeholder="subtitle"
                  value={initialState.subTitle || ""}
                  onChange={(e) => {
                    setInitialState({ ...initialState, subTitle: e.target.value });
                  }}
                />
                <label htmlFor="subtitlecolor">Select a color for the sub-title:</label>
                <input
                  type="color"
                  id="subtitlecolor"
                  value={initialState.subTitleColor || ""}
                  onChange={(e) => {
                    setInitialState({ ...initialState, subTitleColor: e.target.value });
                  }}
                />

                <label htmlFor="image">Upload a background image:</label>
                <input
                  ref={inputRef}
                  type="file"
                  label="Upload Image (optional):"
                  id="image"
                  onChange={(e) => {
                    setInitialState({ ...initialState, file: e.target.files[0] });
                    setFilePreview(URL.createObjectURL(e.target.files[0]));
                    // e.target.value = null;
                  }}
                />
                <label htmlFor="contentimage">Upload Image for content section:</label>
                <input
                  ref={inputRef}
                  type="file"
                  label="Upload Image for content section (optional):"
                  id="contentimage"
                  onChange={(e) => {
                    setInitialState({ ...initialState, contentFile: e.target.files[0] });
                    setContentFilePreview(URL.createObjectURL(e.target.files[0]));
                    // e.target.value = null;
                  }}
                />
              </>
            )}
            <label>Add styled text as main content:</label>
            <Editor
              apiKey="lqx3wrfyv0nu50qbedvjdk62xwsgmjfv1qf40bdntzcsdpvd"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="<p>Write your text here.</p>"
              onEditorChange={onEditorHandleChange}
              init={{
                height: 350,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <label htmlFor="title-color">
              {initialState.template === "job"
                ? `Select a color for the middle section`
                : `Select a color for main content background`}
              :
            </label>
            <input
              type="color"
              id="title-color"
              value={initialState.contentBackgroundColor || ""}
              onChange={(e) => {
                setInitialState({ ...initialState, contentBackgroundColor: e.target.value });
              }}
            />
            {initialState.template !== "job" ? (
              <>
                <label htmlFor="title-color">Select a background color for contact form section:</label>
                <input
                  type="color"
                  id="title-color"
                  value={initialState.formBackgroundColor || ""}
                  onChange={(e) => {
                    setInitialState({ ...initialState, formBackgroundColor: e.target.value });
                  }}
                />
              </>
            ) : (
              <>
                <label htmlFor="job-desc-color">Select a color for the job description background:</label>
                <input
                  type="color"
                  id="job-desc-colorr"
                  value={initialState.jobDescColor || ""}
                  onChange={(e) => {
                    setInitialState({ ...initialState, jobDescColor: e.target.value });
                  }}
                />
                <label htmlFor="bottom-section-color">Select a color for the bottom section background:</label>
                <input
                  type="color"
                  id="bottom-section-color"
                  value={initialState.bottomSectionColor || ""}
                  onChange={(e) => {
                    setInitialState({ ...initialState, bottomSectionColor: e.target.value });
                  }}
                />
                <label htmlFor="title">Enter text for the bottom section:</label>
                <input
                  type="text"
                  id="title"
                  placeholder="text"
                  value={initialState.bottomSectionText || ""}
                  onChange={(e) => {
                    setInitialState({ ...initialState, bottomSectionText: e.target.value });
                  }}
                />
                <label htmlFor="bottom-section-text-color">Select a color for the bottom section text:</label>
                <input
                  type="color"
                  id="bottom-section-text-color"
                  value={initialState.bottomSectionTextColor || ""}
                  onChange={(e) => {
                    setInitialState({ ...initialState, bottomSectionTextColor: e.target.value });
                  }}
                />
              </>
            )}

            {/*<label htmlFor="contacts-fields">Select contact form fields:</label>
            //!complete checkbox */}
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div style={{ alignSelf: "left" }}>{spinner && <Spinner />}</div>

            <button className="createBtn" type="submit">
              {id ? `Update` : `Create`}
            </button>
          </form>
        </div>
        <Preview initialState={initialState} image={filePreview} contentImage={ContentFilePreview} />
      </div>
    </div>
  );
};

export default Create;
