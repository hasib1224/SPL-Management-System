import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import axios from "axios";
import img1 from "../Assets/images/blank.png";
import checkLogin from "../utilities/loginUtilities.js";
import { useNavigate } from "react-router-dom";

function MyTable1() {
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        protectUrl();
        fetchData();
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

            const data = response.data.data;

            console.log(data);
            setAvatar(data.avatar);
            setName(data.name);
            setEmail(data.email);
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
                alert("Please select an image file.");
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

            console.log(response.data);
            setAvatar(response.data.avatar);

            setSelectedImage(null);

            

            alert("Image uploaded successfully");
            window.location.reload();
        } catch (error) {
            console.error("Error uploading image:", error.response.data);
        }
    };

    return (
        <>
            <AdminNav />

            <div className="card" style={{ width: "1450px", margin: "10px" }}>
                <img
                    className="card-img-top rounded mx-auto d-block"
                    style={{ margin: "20px" }}
                    src={avatar ? `http://localhost:3005/api/user/avatar/${avatar}` : img1}
                    alt="User Avatar"
                />
                <div className=" text-center">
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <button type="button bg-transparent text-white" onClick={handleUploadImage}>
                        Upload Image
                    </button>
                </div>
                <div className="card-body text-center">
                    <h4>{name}</h4>
                    <h4>{email}</h4>
                    <br />
                </div>
            </div>
            <br />
            <br />
        </>
    );
}

export default MyTable1;
