import React from "react";
import Sidenav from "../../ZORBS/src/components/Sidenav";
import { Routes, Route } from "react-router-dom";
import NewCommands from "./pages/NewCommands/NewCommands";
function RotasInternas() {
  return (
    <div>
      <Sidenav />
      <Routes>
        <Route path="/NewCommands" element={<NewCommands />} />
      </Routes>
    </div>
  );
}

export default RotasInternas;
