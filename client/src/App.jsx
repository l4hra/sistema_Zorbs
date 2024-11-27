import "./App.css";
import Users from "./pages/Users/Users";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import NewCommands from "./pages/NewCommands/NewCommands";
import Config from "./pages/ConfigLayout/Config";
import LandingPage from "./pages/LandingPage/LandingPage";
import Companies from "./pages/Companies/Companies";
import EditCompanies from "./components/EditCompanies/EditCompanies";
import EditPerfil from "./components/EditPerfil/EditPerfil";
import CreateCompanies from "./components/CreateCompanies/CreateCompanies";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedAccess  }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !allowedAccess.includes(user.type_of_acess)) {
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
          <Route path="/Home" exact element={<ProtectedRoute allowedAccess={["Funcionário", "Administrador", "zorbs"]}><Dashboard /></ProtectedRoute>}></Route>
          <Route path="/Usuarios" exact element={<ProtectedRoute allowedAccess={["Administrador", "zorbs"]}><Users /></ProtectedRoute>}></Route>
          <Route path="/Produtos" exact element={<ProtectedRoute allowedAccess={["Funcionário", "Administrador", "zorbs"]}><Products /></ProtectedRoute>}></Route>
          <Route path="/NewCommands" exact element={<ProtectedRoute allowedAccess={["Funcionário", "Administrador", "zorbs"]}><NewCommands /></ProtectedRoute>}></Route>
          <Route path="/Config" exact element={<ProtectedRoute allowedAccess={["Funcionário", "Administrador", "zorbs"]}><Config /></ProtectedRoute>}></Route>
          <Route path="/Companies" exact element={<ProtectedRoute allowedAccess="zorbs"><Companies /></ProtectedRoute>}></Route>
          <Route path="/CreateCompanies" exact element={<ProtectedRoute allowedAccess="zorbs"><CreateCompanies /></ProtectedRoute>}></Route>
          <Route path="/EditCompanies" exact element={<ProtectedRoute allowedAccess="zorbs"><EditCompanies /></ProtectedRoute>}></Route>
          <Route path="/EditPerfil" exact element={<ProtectedRoute allowedAccess={["Funcionário", "Administrador", "zorbs"]}><EditPerfil /></ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
