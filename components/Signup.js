import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState(""); // New state for organization

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/auth/signup", {
        username,
        email,
        password,
        organization, // Include organization in the request payload
      });

      if (response.data.message === "User already exists.") {
        alert("User already exists");
      } else if (response.data.message === "User created successfully.") {
        navigate("/home"); // Update the route according to your application
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again.");
    }
  }

  const handleOrganizationChange = (e) => {
    setOrganization(e.target.value);
  };

  return (
    <div className="signup">
      <h1>Signup</h1>
      <form>
        <input
          type="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <select value={organization} onChange={handleOrganizationChange} required>
          <option value="">Select Organization</option>
          <option value="Org1">Organization 1</option>
          <option value="Org2">Organization 2</option>
        </select>
        <input type="submit" value="Submit" onClick={submit} />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/">Login Page</Link>
    </div>
  );
}

export default Signup;