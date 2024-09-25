import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidenav from "./components/Sidenav";
import NewCommands from "./pages/NewCommands/NewCommands";

function App() {
  return (
    <>
      <Sidenav />
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/NovaComanda" element={<NewCommands />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
