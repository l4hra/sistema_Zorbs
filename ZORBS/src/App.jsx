import "./App.css";
import Users from "./pages/Users/Users";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import NewCommands from "./pages/NewCommands/NewCommands";
import Config from "./pages/ConfigLayout/Config";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
import UserZorbs from "./pages/UserZorbs/UserZorbs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/Usuarios" exact element={<Users />}></Route>
          <Route path="/Profile-settings" element={<ProfileSettings />}></Route>
          <Route path="/Dashboard" exact element={<Dashboard />}></Route>
          <Route path="/Produtos" exact element={<Products />}></Route>
          <Route path="/NewCommands" exact element={<NewCommands />}></Route>
          <Route path="/Config" exact element={<Config />}></Route>
          <Route path="/Users-Zorbs" exact element={<UserZorbs />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
