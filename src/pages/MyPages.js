import React, { useEffect, useContext, useState } from "react";
import Header from "../components/Header";
import API from "../Api/API";
import { MyContext } from "../context/MyContext";
import PageDiv from "../components/PageDiv";
import Spinner from "../components/Spinner";

const MyPages = () => {
  const { loggedUser, spinner, setSpinner } = useContext(MyContext);
  const [myPages, setMyPages] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(null);
    if (loggedUser) {
      let username = loggedUser.username;
      setSpinner(true);
      try {
        const getData = async () => {
          const { data } = await API.get(`/landings?filters[username]=${username}`);
          setMyPages(data.data);
          setSpinner(false);
        };
        getData();
      } catch (err) {
        console.log(err);
        setError(err.response.data.error.message);
        setSpinner(false);
      }
    }
  }, [loggedUser, setSpinner]);

  const insertPages = () => {
    return myPages.map((page, id) => {
      return (
        <React.Fragment key={id}>
          <PageDiv page={page} handleDelete={handleDelete} setMyPages={setMyPages} />
        </React.Fragment>
      );
    });
  };

  const handleDelete = async (page) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      const { data } = await API.delete(`/landings/${page.id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const filteredPages = myPages.filter((landpage) => landpage.id !== page.id);
      setMyPages(filteredPages);
    }
  };
  console.log("myPages", myPages);
  return (
    <div className="MyPages">
      <Header />
      <h1>My pages</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {spinner && <Spinner />}
      {!spinner && <div className="allPages-container">{insertPages()}</div>}
    </div>
  );
};
export default MyPages;
