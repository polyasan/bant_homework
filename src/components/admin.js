import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Admin(props) {
  const [adminData, setAdminData] = useState([]);
  useEffect(() => {
    getAdminData();
  }, []);

  const getAdminData = () => {
    fetch("https://bw3p5wmm8f.execute-api.us-east-2.amazonaws.com/beta/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "get_admin" }),
    })
      .then((response) => response.json())
      .then((data) => {
        const jsonData = JSON.parse(data.body);
        console.log(jsonData);
        setAdminData(jsonData.Items);
      });
  };

  const replyChanged = (index, newValue) => {
    const response = {
      timestamp: adminData[index].timestamp,
      processedBy: props.user,
      reply: newValue,
      currentStatus: "Processed",
      statusToSet: "Processed",
    };
    console.log(response);

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
      });
  };

  const backToThePool = (index) => {
    const response = {
      timestamp: adminData[index].timestamp,
      processedBy: props.user,
      reply: "none",
      currentStatus: "Processed",
      statusToSet: "Pending",
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
        getAdminData();
      });
  };

  return (
    <div>
      <Link to="/">Login</Link>
      <p>Processed mails:</p>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Reply</th>
            <th>Reset</th>
          </tr>
        </thead>
        <tbody>
          {adminData.map((item, index) => (
            <tr key={index}>
              <td>{item.timestamp}</td>
              <td>{item.processedBy}</td>
              <td>
                <select
                  name="status"
                  value={item.response}
                  onChange={(event) => replyChanged(index, event.target.value)}
                >
                  <option value="Positive">Positive</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Not a lead">Not a lead</option>
                </select>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    backToThePool(index);
                  }}
                >
                  Back to the pool
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
