import { useState } from "react";

function MyForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    alert(`Hello ${firstName} ${lastName}!`);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <labe>First name</labe>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <label>Last name</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input type="submit" value="Submit" />
      <br />
    </form>
  );
}

export default MyForm;
