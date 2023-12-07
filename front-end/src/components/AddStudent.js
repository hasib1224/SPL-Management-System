import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import axios from "axios";
import Footer from "./Footer";
import checkLogin from "../utilities/loginUtilities.js";

export default function CreateStudentAccount() {

  //To protect URL...........
  useEffect(() => {
    protectUrl();
    fetchUserType();
  }, []);

  const navigate = useNavigate();

  const protectUrl = async () => {
    try {
      const userType = await checkLogin();

      if (userType === "teacher") {
        navigate("/ManagerProfile");
      } else if (userType === "student") {
        navigate("/StuProfile");
      } else if (userType === "admin") {
        navigate("/AddStudent");
      } else {
        navigate("/Login");
      }
    } catch (error) {
      console.log(error);
      navigate("/Login");
    }
  };

  const fetchUserType = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/user", {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error fetching data:", error.response.data);
    }
  };

  //...................... protected URL...........

  

  const [formRows, setFormRows] = useState([]);

  const handleAddRow = () => {
    const newRow = {
      rollNo: "",
      registrationNo: "",
      batch: "",
      session: "",
      curriculumYear: "",
      email: "",
    };

    setFormRows([...formRows, newRow]);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;

    const updatedRows = [...formRows];
    updatedRows[index] = {
      ...updatedRows[index],
      [name]: value,
    };

    setFormRows(updatedRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formRows);

      await axios.post(
        "http://localhost:3005/api/user/student",
        { students: formRows },
        {
          withCredentials: true,
        }
      );

      alert("Students added successfully");
      window.location.reload();

      // Redirect to the Admin profile page
      // navigate("/AdminProfile");
    } catch (err) {
      console.log(err.response.data);
      alert("Invalid data format");
    }
  };

  return (
    <>
      <AdminNav />
      <div style={{ backgroundColor: "skyblue" }}>
        <form onSubmit={handleSubmit}>
          {formRows.map((row, index) => (
            <div key={index}>
              <input
                type="text"
                name="rollNo"
                placeholder="Roll No"
                value={row.rollNo}
                onChange={(e) => handleInputChange(index, e)}
                style={{ marginTop: "20px", marginLeft: "40px" }}
              />
              <input
                type="text"
                name="registrationNo"
                placeholder="Registration No"
                value={row.registrationNo}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="text"
                name="batch"
                placeholder="Batch"
                value={row.batch}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="text"
                name="session"
                placeholder="Session"
                value={row.session}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={row.email}
                onChange={(e) => handleInputChange(index, e)}
              />
              <select
                name="curriculumYear"
                value={row.curriculumYear}
                onChange={(e) => handleInputChange(index, e)}
              >
                <option value="">Select Curriculum Year</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
              </select>
            </div>
          ))}
          <br />
          <button
            style={{ marginTop: "20px", marginLeft: "40px" }}
            type="button"
            onClick={handleAddRow}
          >
            Add Student Information
          </button>
          &nbsp; &nbsp; &nbsp;
          <button
            style={{ marginTop: "20px", marginLeft: "40px" }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
