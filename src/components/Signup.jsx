import { useState } from "react";
import axios from "axios";

const Signup = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [roles, setRoles] = useState([]);

  function handleRoleChange(e) {
    const value = e.target.value;
    setRoles((prev) =>
      prev.includes(value)
        ? prev.filter((role) => role !== value)
        : [...prev, value]
    );
  }

  async function addNewEmployee(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://employeemanagement-uo32.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          username: userName,
          roleNames: roles,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message || "Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
      setUserName("");
      setRoles([]);
      onRegister();
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm bg-light text-dark">
            <div className="card-body">
              <h3 className="text-center mb-4">Sign Up</h3>
              <form onSubmit={addNewEmployee}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    className="form-control border-dark"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Employee Email
                  </label>
                  <input
                    type="email"
                    className="form-control border-dark"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control border-dark"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control border-dark"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Roles</label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input border-dark"
                      id="adminRole"
                      value="ROLE_ADMIN"
                      checked={roles.includes("ROLE_ADMIN")}
                      onChange={handleRoleChange}
                    />
                    <label className="form-check-label" htmlFor="adminRole">
                      Admin
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input border-dark"
                      id="userRole"
                      value="ROLE_USER"
                      checked={roles.includes("ROLE_USER")}
                      onChange={handleRoleChange}
                    />
                    <label className="form-check-label" htmlFor="userRole">
                      User
                    </label>
                  </div>
                </div>

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
