import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate(); // Call useNavigate inside the component body

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    axios.post(`http://localhost:8000/user/register`, user).then((result) => {
      if (result.data.message === "User Already Exist") {
        alert(result.data.message);
      } else {
        setUser({
          username: "",
          email: "",
          password: "",
        });
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="my-5">
        <div>
          <h1 className="text-center m-5 text-[2rem] p-8">User Register</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="h-[100%] m-4 ">
            <div className=" ">
              <label className="p-3">UserName</label>
              <br />
              <input
                className=" bg-gray-200 p-2 w-[100%] outline-none rounded-full pl-4 "
                type="text"
                name="username"
                placeholder="username"
                id="username"
                required
                autoComplete="off"
                value={user.username}
                onChange={handleInput}
              />
            </div>
            <div>
              <label className="p-3">Email</label>
              <br />
              <input
                className="bg-gray-200 p-2 w-[100%] outline-none rounded-full pl-4"
                type="email"
                name="email"
                placeholder="email"
                id="email"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div>
              <label className="p-3">Password</label>
              <br />
              <input
                className="bg-gray-200 p-2 w-[100%] outline-none rounded-full pl-4"
                type="password"
                name="password"
                placeholder="password"
                id="password"
                required
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <div className="w-[100%] flex justify-center">
              <button
                className="my-6 bg-green-400 p-2 w-[10rem] rounded-full hover:bg-green-800 hover:text-white"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
          <Link
            className="mx-4 my-6 bg-blue-400 p-3 px-[3.7rem] rounded-full hover:bg-blue-800 hover:text-white "
            to="/"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
