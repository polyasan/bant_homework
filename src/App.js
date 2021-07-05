import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/login";
import Admin from "./components/admin";
import Mail from "./components/mail";

function App() {
  const [user, setUser] = useState("");

  return (
    <Router>
      <div>
        <nav>
        </nav>
        {""}
        <Switch>
          <Route path="/mail">
            <Mail user={user} />
          </Route>
          <Route path="/admin">
            <Admin
              user={user}
            />
          </Route>
          <Route path="/">
            <Login setUser={setUser}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
