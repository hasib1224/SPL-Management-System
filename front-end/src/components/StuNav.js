import Notice from "./Modal.js";
import { useState } from "react";
import React from "react";
import axios from "axios"

export default function StuNav(props) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleSave = () => {
    handleClose();
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
          className="  navbar navbar-expand-lg bg-body-tertiary bg-info"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              SPL Management
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li class="nav-item">
                  <div>
                    <a className="btn text-white  position-relative active" onClick={handleShow}>
                      Notifications{" "}
                      <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                        <span class="visually-hidden">New alerts</span>
                      </span>
                    </a>
                    <Notice
                      show={showModal}
                      handleClose={handleClose}
                      handleSave={handleSave}
                      title="Notification"
                    >
                      <p>
                        On 20th March and 21st March, SPL-2 Presentation will be
                        occured.Be Preapared .{" "}
                      </p>
                    </Notice>
                  </div>
                </li> */}




                <li class="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/TeachProfList"
                  >
                    Teacher's Profile
                  </a>
                </li>

                {/* <li class="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/TeamInfo"
                  >
                    Team Info
                  </a>
                </li> */}



                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle active"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Settings
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item text-white bg-info"
                        href="/StuEditInfo"
                      >
                        Update Information
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item text-white bg-info" href="#">
                        Change Password
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li></li>
                  </ul>
                </li>

                <a href="/" className="btn text-white bg-primary-subtle " onClick={handleLogout}>
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
