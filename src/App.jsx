import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Nav from "./components/Nav";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import EmployeeTask from "./components/AddEmployeeTask";
import EmployeeTaskList from "./components/EmployeeTaskList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Nav isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Signup onRegister={handleLogin} />} />
          </>
        ) : (
          <>
            <Route path="/tasks/employee/:id" element={<EmployeeTaskList />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/addTask" element={<EmployeeTask />} />
            <Route path="/add" element={<AddEmployee />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
