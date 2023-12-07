import React, { useEffect, useState } from "react";
import StuNav from "./StuNav";
import TeacherProfileCard from "./TProfileCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TeachersProfileGridContainer() {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();

        checkType();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3005/api/user/teacher", {
                withCredentials: true,
            });

            // const data = response.data.data;

            setData(response.data.data);

            console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error.response.data);
        }
    };

    const checkType = async () => {
        try {
            // const student = await curriculumYear();
            const res = await axios.get("http://localhost:3005/api/user/curriculumYear", {
                withCredentials: true,
            });

            if (res.data.data.curriculumYear === "1st" || res.data.data.curriculumYear === "2nd"){
                navigate("/StuProfile");
            }

            console.log(res.data.data);
        } catch (error) {
            console.log(error);
            navigate("/Login");
        }
    };

    return (
        <>
            <StuNav />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
                    gap: "20px",
                    padding: "20px",
                }}
            >
                {data.map((item) => (
                    <TeacherProfileCard
                        userId={item.userId}
                        avatar={item.avatar}
                        name={item.name}
                        designation={item.designation}
                        project={item.details}
                        icon={item.icon}
                    />
                ))}
            </div>
        </>
    );
}
