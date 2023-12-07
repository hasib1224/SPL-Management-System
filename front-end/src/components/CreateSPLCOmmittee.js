import React, { useState,useEffect } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import axios from "axios";

import checkLogin from "../utilities/loginUtilities.js";


export default function EditInfo() {


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
        navigate("/CreateSPLCOmmittee");
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





  const nav = useNavigate();
  const [splName, setSplName] = useState("spl1");
  const [splManager, setSplManager] = useState("");
  const [committeeHead, setCommitteeHead] = useState("");
  const [committeeMembers, setCommitteeMembers] = useState([""]);

  const handleSplNameChange = (event) => {
    setSplName(event.target.value);
  };

  const handleSplManagerChange = (event) => {
    setSplManager(event.target.value);
  };

  const handleCommitteeHeadChange = (event) => {
    setCommitteeHead(event.target.value);
  };

  const handleCommitteeMemberChange = (index, event) => {
    const updatedMembers = [...committeeMembers];
    updatedMembers[index] = event.target.value;
    setCommitteeMembers(updatedMembers);
  };

  const addCommitteeMember = () => {
    setCommitteeMembers([...committeeMembers, ""]);
  };

  const removeCommitteeMember = (index) => {
    const updatedMembers = [...committeeMembers];
    updatedMembers.splice(index, 1);
    setCommitteeMembers(updatedMembers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        splName,
        splManager,
        committeeHead,
        committeeMembers,
      };

      console.log(data);

      const response = await axios.post(`http://localhost:3005/api/committee/${data.splName}`, data, {
        withCredentials: true,
      });

      console.log(response.data);
      setSplName("spl1");
      setSplManager("");
      setCommitteeHead("");
      setCommitteeMembers([""]);

      alert("Successfully created committe...");
    } catch (error) {
      alert("Failed to create Committee!!")
      console.error(error);
    }
  };

  return (
    <>
      <AdminNav />

      <div>
        <div className="position-absolute top-50 start-50 translate-middle bg-secondary">
          <form
            className="bg-info-subtle"
            style={{ padding: "10px", height: "100%" }}
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputSPLName">SPL Name</label>
                <select
                  className="form-control"
                  id="inputSPLName"
                  value={splName}
                  onChange={handleSplNameChange}
                >
                  <option value="spl1">SPL 1</option>
                  <option value="spl2">SPL 2</option>
                  <option value="spl3">SPL 3</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputSPLManager">SPL Manager</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputSPLManager"
                  placeholder="Email"
                  value={splManager}
                  onChange={handleSplManagerChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputComHeadEmail">Committee Head</label>
              <input
                type="email"
                className="form-control"
                id="ComHeadEmail"
                placeholder="Email"
                value={committeeHead}
                onChange={handleCommitteeHeadChange}
              />
            </div>
            {committeeMembers.map((member, index) => (
              <div className="form-group" key={index}>
                <label htmlFor={`inputCommitteeMember${index + 1}`}>
                  Committee Member {index + 1}
                </label>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    id={`inputCommitteeMember${index + 1}`}
                    placeholder="Email"
                    value={member}
                    onChange={(event) =>
                      handleCommitteeMemberChange(index, event)
                    }
                  />
                  {index > 0 && (
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      onClick={() => removeCommitteeMember(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              className="btn btn-primary"
              type="button"
              onClick={addCommitteeMember}
            >
              Add Member
            </button>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary" type="submit">
              Create SPL
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
