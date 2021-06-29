import "../App.css";
import { useState } from "react";

function Mail(props) {
  const [modalActive, setModalActive] = useState("none");
  return (
    <div>
      <div className={"btnContainer"}>
        <button type="button">Positive</button>
        <button type="button">Neutral</button>
        <button type="button">Not a lead</button>
      </div>
      <div className="mailBox">{props.mailText}</div>
      <div id="id01" className="modal" style={{ display: modalActive }}>
        <div className="modalContent">
          <div className="modalContainer">
            <h1>Session expired</h1>
            <p>Page will be refreshed because session has epired</p>
            <div>
              <button
                style={{ width: "100px" }}
                type="button"
                onClick={() => setModalActive("none")}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mail;
