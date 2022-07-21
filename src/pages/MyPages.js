import React, { useEffect, useContext, useState } from "react";
import Header from "../components/Header";
import API from "../Api/API";
import { MyContext } from "../context/MyContext";
import PageDiv from "../components/PageDiv";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const MyPages = () => {
  const { loggedUser, spinner, setSpinner } = useContext(MyContext);
  const [myPages, setMyPages] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (loggedUser) {
      let username = loggedUser.username;
      setSpinner(true);
      try {
        const getData = async () => {
          const { data } = await API.get(`/landings?filters[username]=${username}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          });
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
  console.log("myPages", myPages);
  const insertPages = () => {
    return myPages.map((page, id) => {
      console.log("page", page);
      return (
        <React.Fragment key={id}>
          <Link
            to={{
              pathname: `/landing/${page.attributes.uniqid}`,
              state: page,
            }}>
            {" "}
            <PageDiv page={page} />
          </Link>
        </React.Fragment>
      );
    });
  };
  return (
    <div className="MyPages">
      <Header />
      <h1>My pages</h1>
      {spinner && <Spinner />}
      {!spinner && <div className="allPages-container">{insertPages()}</div>}
    </div>
  );
};
export default MyPages;
