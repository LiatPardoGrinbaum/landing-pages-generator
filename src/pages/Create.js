import Header from "../components/Header";
import { useContext, useState, useRef, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import { Editor } from "@tinymce/tinymce-react";
import { v4 as uuidv4 } from "uuid";
import API from "../Api/API";
import Spinner from "../components/Spinner";
import Preview from "../components/Preview";

const Create = (props) => {
  const inputRef = useRef(null);
  const editorRef = useRef(null);
  const { loggedUser, spinner, setSpinner } = useContext(MyContext);
  const [shortDesc, setShortDesc] = useState("");
  const [template, setTemplate] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [title, setTitle] = useState("");
  const [titleColor, setTitleColor] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [subTitleColor, setSubTitleColor] = useState("");
  const [contentFile, setContentFile] = useState(null);
  const [ContentFilePreview, setContentFilePreview] = useState(null);
  const [editorContent, setEditorContent] = useState(null);
  const [contentBackgroundColor, setContentBackgroundColor] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  // const [imageURL, setImageURL] = useState("");
  const [formBackgroundColor, setFormBackgroundColor] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loggedUser) {
      setUsername(loggedUser.username);
    }
  }, [setUsername, loggedUser]);

  const onEditorHandleChange = () => {
    if (editorRef.current) {
      setEditorContent(editorRef.current.getContent());
      // console.log(typeof editorRef.current.getContent());
    }
  };
  //another way to get the same outout:
  // const onEditorHandleChange = (content, editor) => {
  //   setEditorContent(content);
  // };
  const onHandleSumbit = async (e) => {
    setError(null);
    e.preventDefault();
    setSpinner(true);
    try {
      let formData = new FormData();
      formData.append("files", file);
      const { data } = await API.post("/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      // setImageURL(data[0].url);
      const newLanding = {
        shortDesc,
        title,
        titleColor,
        imageURL: data[0].url,
        editorContent,
        contentBackgroundColor,
        formBackgroundColor,
        username,
        uniqid: uuidv4().slice(0, 12),
      };
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
      props.history.push("/mypages");
    } catch (err) {
      console.log(err);
      setError(err.response.data.error.message);
      setSpinner(false);
    }
  };

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
              value={shortDesc}
              onChange={(e) => {
                setShortDesc(e.target.value);
              }}
            />
            <div className="radio-buttons">
              <label> Please select one of the following templates:</label>
              <div>
                <input
                  type="radio"
                  value="events"
                  name="events"
                  checked={template === "events"}
                  onChange={() => setTemplate("events")}
                />
                Events
              </div>
              <div>
                <input
                  type="radio"
                  value="product"
                  name="product"
                  checked={template === "product"}
                  onChange={() => setTemplate("product")}
                />
                Company's product advertising
              </div>
              <div>
                <input
                  type="radio"
                  value="job"
                  name="job"
                  checked={template === "job"}
                  onChange={() => setTemplate("job")}
                />
                Job offer
              </div>
            </div>
            {template === "events" && (
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
            )}

            <label htmlFor="title">Enter the main page title:</label>
            <input
              type="text"
              id="title"
              placeholder="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label htmlFor="title-color">Select a color for the title:</label>
            <input
              type="color"
              id="title-color"
              value={titleColor}
              onChange={(e) => {
                setTitleColor(e.target.value);
              }}
            />
            <label htmlFor="subtitle">Enter sub title:</label>
            <input
              type="text"
              id="subtitle"
              placeholder="subtitle"
              value={subTitle}
              onChange={(e) => {
                setSubTitle(e.target.value);
              }}
            />
            <label htmlFor="subtitlecolor">Select a color for the sub-title:</label>
            <input
              type="color"
              id="subtitlecolor"
              value={subTitleColor}
              onChange={(e) => {
                setSubTitleColor(e.target.value);
              }}
            />
            <label htmlFor="subtitlecolor">Select a color for the sub-title:</label>
            <input
              type="color"
              id="subtitlecolor"
              value={subTitleColor}
              onChange={(e) => {
                setSubTitleColor(e.target.value);
              }}
            />
            <label htmlFor="image">Upload a background image:</label>
            <input
              ref={inputRef}
              type="file"
              label="Upload Image (optional):"
              id="image"
              onChange={(e) => {
                setFile(e.target.files[0]);
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
                setContentFile(e.target.files[0]);
                setContentFilePreview(URL.createObjectURL(e.target.files[0]));
                // e.target.value = null;
              }}
            />
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
            <label htmlFor="title-color">Select a color for main content background:</label>
            <input
              type="color"
              id="title-color"
              value={contentBackgroundColor}
              onChange={(e) => {
                setContentBackgroundColor(e.target.value);
              }}
            />
            <label htmlFor="title-color">Select a color for contact form background:</label>
            <input
              type="color"
              id="title-color"
              value={formBackgroundColor}
              onChange={(e) => {
                setFormBackgroundColor(e.target.value);
              }}
            />
            <label htmlFor="contacts-fields">Select contact form fields:</label>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {spinner && <Spinner />}
            <button className="createBtn" type="submit">
              Create
            </button>
          </form>
        </div>
        <Preview
          title={title}
          image={filePreview}
          template={template}
          subTitle={subTitle}
          titleColor={titleColor}
          subTitleColor={subTitleColor}
          editorContent={editorContent}
          contentImage={ContentFilePreview}
          contentBackgroundColor={contentBackgroundColor}
          formBackgroundColor={formBackgroundColor}
        />
      </div>
    </div>
  );
};

export default Create;
