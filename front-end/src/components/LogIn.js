import React from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";

export default function Login() {
  const [inputs, setInputs] = useState({
    // username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  useEffect(() => {
    protectUrl();
  });

  const protectUrl = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3005/api/auth/check-login",
        {},
        {
          withCredentials: true,
        }
      );

      const userType = res.data.data.userType;

      if (userType === "teacher") {
        navigate("/ManagerProfile");
      } else if (userType === "student") {
        navigate("/StuProfile");
      } else if (userType === "admin") {
        navigate("/AdminProfile");
      } else {
        navigate("/Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log("hadleChange", e);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3005/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );

      const data = res.data.data;

      console.log(data.userType);
      if (data.userType == "admin") {
        // console.log(inputs)
        navigate("/AdminProfile");
      } else if (data.userType == "student") {
        navigate("/stuProfile");
      } else if (data.userType == "teacher") {
        navigate("/ManagerProfile");
      } else navigate("/login");
    } catch (err) {
      alert("Login Failed!! Try Again....");
      navigate("/login");
    }
  };

  return (
    <>
      <Nav />

      <form action="">
        <div
          className="contaner bg-success-subtle"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            width: " 100%",
            margin: " 0 auto",
          }}
        >
          <div className="box shadow p-3 mb-5 bg-info rounded" style={{}}>
            <div class="form-group my-3">
              <label for="EmailInput">
                <strong>Email:</strong>{" "}
              </label>
              <input
                type="email"
                class="form-control"
                id="EmailInput"
                placeholder="Enter Email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div class="form-group my-3">
              <label for="PasswordInput">
                <strong>Password:</strong>
              </label>
              <input
                type="password"
                class="form-control"
                id="PasswordInput"
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <center>
              {/* {err && <p>{err}</p>} */}
              {err && <p>{JSON.stringify(err)}</p>}
              <a href="/recovery_password" style={{ color: "blue" }}>
                Forgot Password?
              </a>{" "}
              <br />
              <br />
              <input
                className="btn btn-outline-light"
                type="submit"
                value="login"
                // onClick={login_btn_clicked2}
                onClick={handleSubmit}
              />
            </center>
          </div>
        </div>
      </form>
    </>
  );
}
