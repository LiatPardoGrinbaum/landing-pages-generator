import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Create from "./pages/Create";
import "./style/App.css";
import Header from "./components/Header";

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
            {/* <Route path="/landing/:id" component={Landing} />
            <Route path="/mypages" component={MyPages} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
