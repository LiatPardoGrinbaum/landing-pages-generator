import Header from "../components/Header";
import { useContext, useState, useRef, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import { Editor } from "@tinymce/tinymce-react";

const Create = () => {
  const inputRef = useRef(null);
  const editorRef = useRef(null);
  const { loggedUser, setSpinner } = useContext(MyContext);
  const [title, setTitle] = useState("");
  const [titleColor, setTitleColor] = useState("");
  const [editorContent, setEditorContent] = useState(null);
  const [contentBackgroundColor, setContentBackgroundColor] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  const [formBackgroundColor, setFormBackgroundColor] = useState("");

  useEffect(() => {
    if (loggedUser) {
      setUsername(loggedUser.username);
    }
  }, [setUsername]);

  const onEditorHandleChange = () => {
    if (editorRef.current) {
      setEditorContent(editorRef.current.getContent());
    }
  };
  //another way to get the same outout:
  // const onEditorHandleChange = (content, editor) => {
  //   setEditorContent(content);
  // };
  const onHandleSumbit = () => {};
  console.log(editorContent);
  return (
    <div className="createPage">
      <Header />
      <h1>Create your new landing page</h1>
      <div className="form-create-landing">
        <form onSubmit={onHandleSumbit}>
          <label htmlFor="title">Enter main page title:</label>
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
          <label htmlFor="image">Upload a background image:</label>
          <input
            ref={inputRef}
            type="file"
            label="Upload Image (optional):"
            id="image"
            onChange={(e) => {
              setFile(e.target.files[0]);
              // e.target.value = null;
            }}
          />
          <label>Add styled text as main content:</label>
          <Editor
            apiKey="lqx3wrfyv0nu50qbedvjdk62xwsgmjfv1qf40bdntzcsdpvd"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            onEditorChange={onEditorHandleChange}
            init={{
              height: 400,
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
          <button className="createBtn" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
