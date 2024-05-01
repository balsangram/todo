import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./page/Login";
import Register from "./page/Register";
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="todo" element={<Todo />} />
      </Routes>
    </>
  );
}

export default App;
