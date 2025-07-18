import { useState } from "react";
import axios from "axios";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [roleNames, setRoleNames] = useState([]);

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRoleNames((prev) =>
      prev.includes(value)
        ? prev.filter((role) => role !== value)
        : [...prev, value]
    );
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://employeemanagement-uo32.onrender.com/employee",
        {
          name,
          email,
          password,
          userName,
          roleNames,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Employee added successfully");
      setName("");
      setEmail("");
      setUserName("");
      setPassword("");
      setRoleNames([]);
    } catch (error) {
      console.error("Add employee failed", error);
      alert(error.response?.data?.message || "Failed to add employee");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm bg-light text-dark">
            <div className="card-body">
              <h3 className="text-center mb-4">Add Employee</h3>
              <form onSubmit={handleAddEmployee}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
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
                  <label htmlFor="email" className="form-label">Email</label>
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
                  <label htmlFor="userName" className="form-label">Username</label>
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
                  <label htmlFor="password" className="form-label">Password</label>
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
                  <label className="form-label">Roles</label>
                  <div className="form-check">
                    <input
                      className="form-check-input border-dark"
                      type="checkbox"
                      value="ROLE_ADMIN"
                      id="roleAdmin"
                      checked={roleNames.includes("ROLE_ADMIN")}
                      onChange={handleRoleChange}
                    />
                    <label className="form-check-label" htmlFor="roleAdmin">
                      Admin
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input border-dark"
                      type="checkbox"
                      value="ROLE_USER"
                      id="roleUser"
                      checked={roleNames.includes("ROLE_USER")}
                      onChange={handleRoleChange}
                    />
                    <label className="form-check-label" htmlFor="roleUser">
                      User
                    </label>
                  </div>
                </div>

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-success">
                    Add Employee
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

export default AddEmployee;
