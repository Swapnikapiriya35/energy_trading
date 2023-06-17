import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      if (response.data.message === "Login successful.") {
        navigate("/home"); // Update the route according to your application
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred. Please try again.");
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form>
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
        <input type="submit" value="Submit" onClick={submit} />
      </form>
      {message && <p>{message}</p>}
      <br />
      <p>OR</p>
      <br />
      <Link to="/signup">Signup Page</Link>
    </div>
  );
}

export default Login;
