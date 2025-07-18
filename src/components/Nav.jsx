import { Link } from "react-router-dom";

const Nav = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        EMS
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {!isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/employees">Employee List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add Employee</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addTask">Add Task</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light ms-2" onClick={onLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
