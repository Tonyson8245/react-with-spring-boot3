import { useState } from "react";

function MyForm() {
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    alert(`Hello ${user.firstName} ${user.lastName}!`);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <labe>First name</labe>
      <input
        type="text"
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
      />
      <br />
      <label>Last name</label>
      <input
        type="text"
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
      />
      <br />
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <br />
      <input type="submit" value="Submit" />
      <br />
    </form>
  );
}

export default MyForm;
