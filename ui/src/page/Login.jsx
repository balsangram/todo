// Import axios and other necessary dependencies
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../app/store";

function Login() {
  const dispatch = useDispatch();
  // State variables to store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend API endpoint
      const response = await axios.post(`http://localhost:8000/user/login`, {
        email,
        password,
      });

      // Handle successful login
      sessionStorage.setItem("id", response.data.user._id);
      dispatch(authActions.login());
      navigate("/todo");
    } catch (error) {
      // Handle errors
      console.error("Login failed:", error.response.data.message);
      // Display error message to the user, e.g., using a toast or alert
    }
  };

  return (
    <div className=" h-[100%] m-4">
      <h1 className="text-center m-5 text-[2rem] p-8">Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="p-3">Email</label>
          <br />
          <input
            className="bg-gray-200 p-2 w-[100%] outline-none rounded-full pl-4"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="p-3">Password</label>

          <input
            className="bg-gray-200 p-2 w-[100%] outline-none rounded-full pl-4"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="w-[100%] flex justify-center">
          <button
            className="my-6 mx-2 bg-green-400 p-2 w-[10rem] rounded-full hover:bg-green-800 hover:text-white "
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <div>
        <Link
          className="mx-4 my-6 bg-blue-400 p-3 px-[3.7rem] rounded-full hover:bg-blue-800 hover:text-white "
          to="/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
