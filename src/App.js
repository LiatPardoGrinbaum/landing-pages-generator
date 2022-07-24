import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Create from "./pages/Create";
import "./style/App.css";
// import Header from "./components/Header";
import MyPages from "./pages/MyPages";
import LandingPage from "./pages/LandingPage";
import ContactsPage from "./pages/ContactsPage";
import EventPageDemo from "./pages/EventPageDemo";
import JobPageDemo from "./pages/JobPageDemo";
import ProductPageDemo from "./pages/ProductPageDemo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="main-container">
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/create" component={Create} />
            <Route path="/mypages" component={MyPages} />
            <Route path="/landing/:id" component={LandingPage} />
            <Route path="/contacts/landing/:id" component={ContactsPage} />
            <Route path="/eventpagedemo" component={EventPageDemo} />
            <Route path="/jobpagedemo" component={JobPageDemo} />
            <Route path="/productpagedemo" component={ProductPageDemo} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
