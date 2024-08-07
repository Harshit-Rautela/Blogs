import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./components/Home";
import Create from "./components/Create";
import AllBlogs from "./components/AllBlogs";
import Login from "./components/LogIn";
import SignUp from "./components/Signup";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import GettingStarted from "./components/Header/GettingStarted";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/get-started" element={<GettingStarted/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
