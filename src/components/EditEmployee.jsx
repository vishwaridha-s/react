import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    roleNames: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const empId = searchParams.get("empId");

  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`https://employeemanagement-uo32.onrender.com/employee/${empId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee({
          name: res.data.name || "",
          email: res.data.email || "",
          userName: res.data.userName || "",
          password: "",
          roleNames: res.data.roles ? res.data.roles.map(r => r.roleName) : [],
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch employee data");
        setLoading(false);
      }
    };
    if (empId) fetchEmployee();
  }, [empId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setEmployee((prev) => ({
      ...prev,
      roleNames: prev.roleNames.includes(value)
        ? prev.roleNames.filter((role) => role !== value)
        : [...prev.roleNames, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `https://employeemanagement-uo32.onrender.com/employee/${empId}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Employee updated successfully");
      navigate("/employees");
    } catch (err) {
      setError("Failed to update employee");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm bg-light text-dark">
            <div className="card-body">
              <h3 className="text-center mb-4">Edit Employee</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control border-dark"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control border-dark"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control border-dark"
                    name="userName"
                    value={employee.userName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control border-dark"
                    name="password"
                    value={employee.password}
                    onChange={handleChange}
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
                      checked={employee.roleNames.includes("ROLE_ADMIN")}
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
                      checked={employee.roleNames.includes("ROLE_USER")}
                      onChange={handleRoleChange}
                    />
                    <label className="form-check-label" htmlFor="roleUser">
                      User
                    </label>
                  </div>
                </div>
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-success">
                    Update Employee
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

export default EditEmployee; 