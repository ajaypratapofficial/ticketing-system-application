import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Pagenotfound from "./pages/Pagenotfound";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";
import About from "./pages/About";
import HomePage from "./pages/HomePage";
import CustomerRoute from "./components/Routes/CustomerPrivate";
import EmployeeRoute from "./components/Routes/EmployeePrivate";
import AdminRoute from "./components/Routes/AdminPrivate";

import CustomerDashboard from "./pages/allDashboard/CustomerDashboard";
import EmployeeDashboard from "./pages/allDashboard/EmployeeDashboard";
import AdminDashboard from "./pages/allDashboard/AdminDashboard";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<CustomerRoute />}>
          <Route path="customer" element={<CustomerDashboard />} />
        </Route>

        <Route path="/dashboard" element={<EmployeeRoute />}>
          <Route path="employee" element={<EmployeeDashboard />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;

// register //pnf
