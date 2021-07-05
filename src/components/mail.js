import "../App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Mail(props) {
  const [modalActive, setModalActive] = useState(false);
  const [mailBody, setMailBody] = useState([]);
  const [timestamp, setTimeStamp] = useState(0);
  const [isAvailable, setAvailable] = useState(true);

  const expirationTime = 120000;

  useEffect(() => {
    getItem();
    setTimeout(() => {
      setModalActive(true);
    }, expirationTime);
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
        setTimeStamp(jsonData.timestamp);
      });
  };

  const sendResponse = (status) => {
    const response = {
      timestamp: timestamp,
      processedBy: props.user,
      reply: status,
      currentStatus: "Pending",
      statusToSet: "Processed",
    };

    fetch("https://bw3p5wmm8f.execute-api.us-east-2.amazonaws.com/beta/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "set_status", ...response }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.body !== undefined) {
          const jsonData = JSON.parse(data.body);
          console.log(jsonData);
        } else {
          console.log(data);
        }
        getItem();
        setTimeout(() => {
          setModalActive(true);
        }, expirationTime);
      });
  };

  const onSessionExpClicked = () => {
    setModalActive(false);
    if (isAvailable) {
      getItem();
    } else {
      setMailBody([]);
    }
  };

  const onRadioChanged = (event) => {
    if (!isAvailable && mailBody.length === 0) {
      getItem();
    }
    setAvailable(!isAvailable);
  };

  return (
    <div>
      <Link to="/">Login</Link>
      <p style={{ display: "flex", flexDirection: "row" }}>
        <input
          type="radio"
          name="availability"
          value="available"
          checked={isAvailable}
          onChange={onRadioChanged}
        />
        <label>Available</label>
        <br /> {" "}
        <input
          type="radio"
          name="availability"
          value="away"
          checked={!isAvailable}
          onChange={onRadioChanged}
        />
        <label>Away</label>
      </p>
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
      <div
        id="id01"
        className="modal"
        style={{ display: modalActive ? "block" : "none" }}
      >
        <div className="modalContent">
          <div className="modalContainer">
            <h1>Session expired</h1>
            <p>Page will be refreshed because session has epired</p>
            <div>
              <button
                style={{ width: "100px" }}
                type="button"
                onClick={onSessionExpClicked}
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
