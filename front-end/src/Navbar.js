import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <nav
        className="navbar navbar-expand bg-secondary"
        aria-label="Second navbar example"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample02"
            aria-controls="navbarsExample02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active link-info " to="/Search">
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active link-info " to="/Home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active link-info" to="/Login">
                  Login
                </Link>
              </li>
              <form>
                <button
                  className="form btn btn-danger  position-absolute  end-50"
                  type="submit"
                  method="post"
                  to="/logout"
                >
                  Logout
                </button>
              </form>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
