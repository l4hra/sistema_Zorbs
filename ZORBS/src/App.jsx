import "./App.css";
import Users from "./pages/Users/Users";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import NewCommands from "./pages/NewCommands/NewCommands";
import Config from "./pages/ConfigLayout/Config";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LandingPage />}></Route>

          <Route path="/Login" exact element={<Login />}></Route>
          <Route path="/Home" exact element={<Dashboard />}></Route>
          <Route path="/Usuarios" exact element={<Users />}></Route>
          <Route path="/Produtos" exact element={<Products />}></Route>
          <Route path="/NewCommands" exact element={<NewCommands />}></Route>
          <Route path="/Config" exact element={<Config />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
