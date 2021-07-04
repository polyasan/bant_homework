import "../App.css";
import { useState, useEffect } from "react";

function Mail(props) {
  const [modalActive, setModalActive] = useState("none");
  const [mailBody, setMailBody] = useState([]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = () => {
    fetch("https://bw3p5wmm8f.execute-api.us-east-2.amazonaws.com/beta/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "get_item" }),
    })
      .then((response) => response.json())
      .then((data) => {
        const jsonData = JSON.parse(data.body);
        console.log(jsonData);
        setMailBody(jsonData.body.split("\n"));
      });
  };

  const sendResponse = (response) => {};

  return (
    <div>
      <div className={"btnContainer"}>
        <button
          type="button"
          onClick={() => {
            sendResponse("Positive");
          }}
        >
          Positive
        </button>
        <button
          type="button"
          onClick={() => {
            sendResponse("Neutral");
          }}
        >
          Neutral
        </button>
        <button
          type="button"
          onClick={() => {
            sendResponse("Not a lead");
          }}
        >
          Not a lead
        </button>
      </div>
      <div className="mailBox">
        {mailBody.map((str, index) => (
          <div key={index}>
            {str}
            <br />
          </div>
        ))}
      </div>
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
