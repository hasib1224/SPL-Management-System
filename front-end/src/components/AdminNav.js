import React from "react";
import "./Nav.css";
import axios from "axios";

import AssignSPL from "./AssignStudent.js";
import CreateSPL from "./CreateSPL.js";
import CreateTeam from "./CreateTeam.js";
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

  const [showModal2, setShowModal2] = useState(false);
  const handleClose2 = () => setShowModal2(false);
  const handleShow2 = () => setShowModal2(true);
  const handleSave2 = () => {
    // Save changes logic here
    handleClose2();
  };

  const [showModal3, setShowModal3] = useState(false);
  const handleClose3 = () => setShowModal3(false);
  const handleShow3 = () => setShowModal3(true);
  const handleSave3 = () => {
    // Save changes logic here
    handleClose3();
  };

  const handleLogout = async () => {
    try {
      // Make an HTTP POST request to the logout endpoint
      await axios.post("http://localhost:3005/api/auth/logout", null, {
        withCredentials: true,
      });

      // Redirect or perform any other actions after successful logout
      // For example, you can redirect the user to the login page
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
                <li>
                  <NavLink
                    className="nav-link text-white"
                    to="/AddStudent"
                    role="button"
                    aria-expanded="false"
                  >
                    Add Student
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="nav-link text-white"
                    to="/AddTeacher"
                    role="button"
                    aria-expanded="false"
                  >
                    Add Teacher
                  </NavLink>
                </li>

                <li className="nav-item ">
                  <div>
                    <button
                      className=" bg-transparent text-white"
                      onClick={handleShow2}
                    >
                      Create SPL
                    </button>
                    <CreateSPL
                      show2={showModal2}
                      handleClose2={handleClose2}
                      handleSave2={handleSave2}
                      title="Create SPL"
                    ></CreateSPL>
                  </div>
                </li>

                <li>
                  <a
                    className="nav-link text-white"
                    href="/CreateSPLCOmmittee"
                    role="button"
                    aria-expanded="false"
                  >
                    Create SPL Committee
                  </a>
                </li>

                <li>
                  <a
                    className="nav-link text-white"
                    href="/CreateTeam"
                    role="button"
                    aria-expanded="false"
                  >
                    Create SPL-2 Team
                  </a>
                </li>

                {/* <li className="nav-item ">
                  <div>
                    <button
                      className=" bg-transparent text-white"
                      onClick={handleShow3}
                    >
                      Create SPL-2 Team
                    </button>
                    <CreateTeam
                      show3={showModal3}
                      handleClose3={handleClose3}
                      handleSave3={handleSave3}
                      title="Create SPL-2 Team"
                    ></CreateTeam>
                  </div>
                </li> */}

                <li className="nav-item ">
                  <div>
                    <button
                      className=" bg-transparent text-white"
                      onClick={handleShow}
                    >
                      Assign SPL
                    </button>
                    <AssignSPL
                      show={showModal}
                      handleClose={handleClose}
                      handleSave={handleSave}
                      title="Assign SPL"
                    ></AssignSPL>
                  </div>
                </li>

                <li>
                  <a
                    className="nav-link text-white"
                    href="/ManualSupAlloc"
                    role="button"
                    aria-expanded="false"
                  >
                    Supervisor Allocation
                  </a>
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
                        to="/SplThree"
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
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
