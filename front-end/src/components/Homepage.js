import React, { useEffect } from "react";
import Nav from "./Nav";
import classes from "../styles/HomePage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function Homepage() {
    useEffect(() => {
        protectUrl();
    }, []);

    const navigate = useNavigate();


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
              navigate("/Login")
            }
        } catch (error) {
            console.log(error);
            // navigate("/Login");
        }
    };

    return (
        <>
            <Nav />
            <div className={classes.homePic}></div>
            <Footer/>
        </>
    );
}
