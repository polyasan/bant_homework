import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Admin from "./components/admin";
import Mail from "./components/mail";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/mail">Mail</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>
        {""}
        <Switch>
          <Route path="/mail">
            <Mail mailText={"Sdsdsdsdsd"} />
          </Route>
          <Route path="/admin">
            <Admin
              mails={[
                { timestamp: "11.2.3", user: "Sanya", reply: "neutral" },
                { timestamp: "11.2.4", user: "Reka", reply: "not_a_lead" },
              ]}
              replyChanged={(index, newValue) => console.log(index, newValue)}
            />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
