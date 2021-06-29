function Admin(props) {
  return (
    <div>
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
          {props.mails.map((item, index) => (
            <tr key={index}>
              <td>{item.timestamp}</td>
              <td>{item.user}</td>
              <td>
                <select
                  name="status"
                  value={item.reply}
                  onChange={(event) =>
                    props.replyChanged(index, event.target.value)
                  }
                >
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="not_a_lead">Not a lead</option>
                </select>
              </td>
              <td>
                <button type="button">Back to the pool</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
