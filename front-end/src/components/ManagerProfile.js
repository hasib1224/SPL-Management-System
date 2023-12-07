import React from "react";
import { useState, useEffect } from "react";
import ReqStuSpl3 from "./ReqStuSpl3.js";
import ReqStuSpl2 from "./ReqStuSpl2.js"
import ManNav from "./ManNav";
import img1 from "../Assets/images/blank.png";
import checkLogin from "../utilities/loginUtilities.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function TeachersProfileGrid() {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [designation, setDesignation] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the backend API
    protectUrl()
    fetchData();
    getRequestedStudents();
    getRequestedTeams();
  }, []);

  const protectUrl = async () => {
    try {
        const userType = await checkLogin();

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
        navigate("/Login");
    }
};

  const fetchData = async () => {
    try {
      // Make an HTTP GET request to fetch the data
      const response = await axios.get("http://localhost:3005/api/user", {
        withCredentials: true,
      });

      const data = response.data.data;

      console.log(data);

      // Update the state with the received data
      setAvatar(data.avatar);
      setName(data.name);
      setEmail(data.email);
      setDesignation(data.designation);
    } catch (error) {
      console.error("Error fetching data:", error.response.data);
    }
  };

  const getRequestedStudents = async () => {
    try {
      // Make an HTTP GET request to fetch the data
      const res = await axios.get("http://localhost:3005/api/user/request/student", {
        withCredentials: true,
      });

      const data = res.data.data;

      console.log("requested", data);

      
    } catch (error) {
      console.error("Error fetching data:", error.response.data);
      
    }
  };

  const getRequestedTeams = async () => {
    try {
      // Make an HTTP GET request to fetch the data
      const res = await axios.get("http://localhost:3005/api/team/requested", {
        withCredentials: true,
      });

      const data = res.data.data;

      console.log("Teams", data);

      
    } catch (error) {
      console.error("Error fetching data:", error.response.data);
      
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!selectedImage) {
        // console.error("Please select an image file.");
        alert("PLease select an image file");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", selectedImage);

      const response = await axios.post(
        "http://localhost:3005/api/user/avatar",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(response.data.message);
      alert(response.data.message);

      setSelectedImage(null);
    } catch (error) {
      console.error("Error uploading image:", error.response.data);
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  // const [inputText, setInputText] = useState("");

  // function handleInputChange(event) {
  //   setInputText(event.target.value);
  // }

  // const handlePostNotice = () => {
  //   setInputText("");
  // };

  return (
    <>
      <ManNav />

      <div
        className="card"
        style={{
          margin: "20px",
          boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="card-body">
          <img
            className="card-img-top"
            style={{ margin: "20px", width: "5000px", height: "70px" }}
            src={
              avatar ? `http://localhost:3005/api/user/avatar/${avatar}` : img1
            }
          />

          <h4> {name}</h4>
          <h5>{designation}</h5>
          <h6>IIT,DU</h6>
          <br />
        </div>
        <div style={{margin: "20px"}}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button
            type="button bg-transparent text-white"
            onClick={handleUploadImage}
          >
            Upload Image
          </button>
        </div>
      </div>
      <br />
      <br />

      <ReqStuSpl2/>

      <ReqStuSpl3 />
    </>
  );
}
