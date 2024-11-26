import "./App.css";
import Users from "./pages/Users/Users";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import NewCommands from "./pages/NewCommands/NewCommands";
import Config from "./pages/ConfigLayout/Config";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
import Companies from "./pages/Companies/Companies";
import EditCompanies from "./components/EditCompanies/EditCompanies";
import EditPerfil from "./components/EditPerfil/EditPerfil";
import CreateCompanies from "./components/CreateCompanies/CreateCompanies";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredAccess }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.type_of_acess !== requiredAccess) {
    return <Navigate to="/Login" />;
  }

  return children;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LandingPage />}></Route>
          <Route path="/Login" exact element={<Login />}></Route>
          <Route path="/Home" exact element={<Dashboard />}></Route>
          <Route path="/Usuarios" exact element={<ProtectedRoute requiredAccess="Funcionário"><Users /></ProtectedRoute>}></Route>
          <Route path="/Profile-settings" element={<ProfileSettings />}></Route>
          <Route path="/Produtos" exact element={<Products />}></Route>
          <Route path="/NewCommands" exact element={<NewCommands />}></Route>
          <Route path="/Config" exact element={<Config />}></Route>
          <Route path="/Companies" exact element={<Companies />}></Route>
          <Route path="/CreateCompanies" exact element={<CreateCompanies />}></Route>
          <Route path="/EditCompanies" exact element={<EditCompanies />}></Route>
          <Route path="/EditPerfil" exact element={<EditPerfil />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
