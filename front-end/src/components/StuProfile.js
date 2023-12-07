import React, { useState, useEffect } from "react";
import axios from "axios";
import StuNav from "./StuNav";
import img1 from "../Assets/images/blank.png";
import blank from "../Assets/images/blank.png";
import { useNavigate } from "react-router-dom";
import checkLogin from "../utilities/loginUtilities.js";


export default function TeachersProfileGrid() {
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [rollNo, setRollNo] = useState("");
    const [curriculumYear, setCurriculumYear] = useState("");
    const [splName, setSPlName] = useState("");
    const[details,setDetails]=useState("");
    // const [splName1, setSPLName] = useState(splName ? splName : "Not assigned");

    const navigate = useNavigate();

    useEffect(() => {
        protectUrl();
        fetchData();
    }, []);

    const protectUrl = async () => {
        try {
            const userType = await checkLogin();
            console.log(userType);

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
            const response = await axios.get("http://localhost:3005/api/user", {
                withCredentials: true,
            });

            console.log(response);

            const data = response.data.data;
            console.log(data);

            setAvatar(data.avatar);
            setName(data.name);
            setEmail(data.email);
            setRollNo(data.rollNo);
            setCurriculumYear(data.curriculumYear);
            setDetails(data.details);

            const updatedSplName = data && data.splName ? data.splName : "Not assigned";
            setSPlName(updatedSplName);
            // setSPLName(data.splName);
        } catch (error) {
            console.error("Error fetching data:", error.response.data);
        }
    };

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleUploadImage = async () => {
        try {
            if (!selectedImage) {
                console.error("Please select an image file.");
                return;
            }

            const formData = new FormData();
            formData.append("avatar", selectedImage);

            const response = await axios.post("http://localhost:3005/api/user/avatar", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Image uploaded successfully");

            // console.log(response.data);
            setAvatar(response.data.avatar);
            setSelectedImage(null);
        } catch (error) {
            alert("Failed to upload Image");
            console.error("Error uploading image:", error.response.data);
        }
    };

    return (
        <>
            <StuNav />

            <div
                className="card"
                style={{ margin: "20px", boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.3)" }}
            >
                <img
                    className="card-img-top rounded mx-auto d-block"
                    style={{ margin: "20px" }}
                    src={avatar ? `http://localhost:3005/api/user/avatar/${avatar}` : img1}
                    alt="User Avatar"
                />

                <div className="card-body text-center">
                    <h4>{name}</h4>
                    {/* <h6>{email}</h6> */}
                    <h5>Roll: {rollNo}</h5>
                    <h5>Curriculum Year: {curriculumYear}</h5>
                    <h5>SPL: {splName}</h5>
                    <h5>{details}</h5>
                    <br />
                </div>
                <div className=" text-center">
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <button type="button bg-transparent text-white" onClick={handleUploadImage}>
                        Upload Image
                    </button>
                </div>
                <br />
            </div>

            {/* This is only for SPL-2 students */}
            <div className=" text-center" style={{ padding: "20px" }}>
                {/* <h6> <strong>If you've formed team already, <br/>then visit teachers profile<br/> to request them..</strong></h6>
                 */}
            </div>
        </>
    );
}
