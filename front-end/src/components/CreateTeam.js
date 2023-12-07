
import React, { useState,useEffect } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNav from "./AdminNav";
import Footer from "./Footer";
import checkLogin from "../utilities/loginUtilities.js";

export default function CreateTeam() {

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
        navigate("/CreateTeam");
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

  //............... protected URL...........




  const [teamName, setTeamName] = useState("");
  const [teamMemberEmail, setTeamMemberEmail] = useState("");

  const handleInputChange = (event) => {
    if (event.target.name === "teamName") {
      setTeamName(event.target.value);
    } else if (event.target.name === "teamMemberEmail") {
      setTeamMemberEmail(event.target.value);
    }
  };

  const handleFormTeamClick = async () => {
    try {
      const members = teamMemberEmail
        .split(",")
        .map((email) => email.trim());
  
      const formData = {
        teamName,
        members,
      };
      console.log(formData);
  
      const res = await axios.post("http://localhost:3005/api/team", formData, {
        withCredentials: true,
      });

      console.log(res);
      alert("Team created successfully");

      setTeamName("");
      setTeamMemberEmail("");
    } catch (error) {
      console.error(error.response);
      alert("Unable to create team")
    }
  };

  return (
    <div style={{backgroundColor:"skyblue",height:"600px"}}>
      <AdminNav />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "30px auto",
          maxWidth: "600px",
        }}
      >
        <div
          style={{
            background: "lightgreen",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <label>
            Team Name
            <br />
            <input
              type="text"
              name="teamName"
              value={teamName}
              onChange={handleInputChange}
              placeholder="Enter team name"
            />
          </label>
          <br />
          <br />
          {/* &nbsp;&nbsp;&nbsp; */}
          <label>
            Team Member Email
            <br />
            <textarea
              name="teamMemberEmail"
              value={teamMemberEmail}
              onChange={handleInputChange}
              placeholder="Enter team members' email (separated by commas)"
              style={{  height: "80px", resize: "vertical" }}
            />
          </label>
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={handleFormTeamClick}>Form team</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

