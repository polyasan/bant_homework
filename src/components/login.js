import React, { useState, useCallback } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [user, setUser] = useState("");
  const [warning, setWarning] = useState(false);
  const history = useHistory();
  const redirectToUser = useCallback(() => history.push("/mail"), [history]);
  const redirectToAdmin = useCallback(() => history.push("/admin"), [history]);

  const onLogin = () => {
    const a = parseInt(user.substring(4));
    if (user.substring(0, 4) === "User" && !isNaN(a)) {
      redirectToUser();
    } else if (user === "admin") {
      redirectToAdmin();
    } else {
      setWarning(true);
    }
  };
  
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
      <span style={{ display: warning ? "block" : "none", color: "#ff1744" }}>
        Uesrname must start with "User" or "admin"
      </span>
      <p>
        <button style={{ width: "100px" }} type="button" onClick={onLogin}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Login;
