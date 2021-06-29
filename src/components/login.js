import React, { useState } from "react";
import "../App.css";

function Login(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="Login">
      <p>
        Username:
        <br />
        <input
          type="text"
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />
      </p>
      <p>
        Password:
        <br />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </p>
      <p>
        <button style={{width: "100px"}}type="button">Login</button>
      </p>
    </div>
  );
}

export default Login;
