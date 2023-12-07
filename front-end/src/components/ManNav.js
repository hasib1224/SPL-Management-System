import React from "react";
import "./Nav.css";
import axios from "axios";
import Notice from "./Modal";

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function AdminNav(props) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleSave = () => {
    // Save changes logic here
    handleClose();
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3005/api/auth/logout", null, {
        withCredentials: true,
      });

      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error.response.data);
    }
  };

  return (
    <>
      <div className="bg-info">
        <nav
          className="navbar navbar-expand-lg bg-body-tertiary bg-info"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              SPL Management
            </a>
            <button
              className="navbar-toggler "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span
                className="navbar-toggler-icon"
                style={{ Color: "black" }}
              ></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <div>
                    <button className="btn btn-primary" onClick={handleShow}>
                      Notification
                    </button>
                    <Notice
                      show={showModal}
                      handleClose={handleClose}
                      handleSave={handleSave}
                      title="New Notice"
                    >
                      <p>
                        On 20th March and 21st March, SPL-2 Presentation will be
                        occured.Be Preapared .{" "}
                      </p>
                    </Notice>
                  </div>
                </li>


                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Marking
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        className="dropdown-item text-white bg-info"
                        to="/AddManagerMark"
                      >
                        Add Mark
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item text-white bg-info"
                        to="/PreviousMark"
                      >
                        Previous Mark
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li>
                  <NavLink
                    className="nav-link"
                    to="/SupervisorStu"
                    role="button"
                    aria-expanded="false"
                  >
                    Assigned Students
                  </NavLink>
                </li>

                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Students Data
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        className="dropdown-item text-white bg-info"
                        to="/splOne"
                      >
                        SPL-1
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item text-white bg-info"
                        to="/splTwo"
                      >
                        SPL-2
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        className="dropdown-item text-white bg-info"
                        to="#"
                      >
                        SPL-3
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle "
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Settings
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        className="dropdown-item text-white bg-info"
                        to="/TeachEditInfo"
                      >
                        Update Information
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item text-white bg-info"
                        to="#"
                      >
                        Change Password
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <a
                  href="/"
                  className="btn text-white bg-primary-subtle "
                  onClick={handleLogout}
                >
                  Log Out
                </a>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
