import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import AdminNav from "./AdminNav.js";
import classes from "../styles/SplOne.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkLogin from "../utilities/loginUtilities.js";

export default function MyTable1() {
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        isAdmin();
        fetchData();
    }, []);

    const isAdmin = async () => {
        try {
            const userType = await checkLogin();

            if (userType === "teacher") {
                navigate("/ManagerProfile");
            } else if (userType === "student") {
                navigate("/StuProfile");
            }
        } catch (error) {
            console.log(error);
            navigate("/Login");
        }
    };

    const randomize = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3005/api/supervisor-allocation/assign/spl1",
                {},
                {
                    withCredentials: true,
                }
            );
            // setTableData(res.data);
            // console.log(res.response.data.message);
            alert("Randomization done");
        } catch (error) {
            if (error.response.data.message) {
                alert(error.response.data.message);
            }
            console.log(error.response);
        }
    };

    const fetchData = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3005/api/user/student/2nd/supervisor",
                {},
                { withCredentials: true }
            );

            console.log(res.data.data);

            setTableData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <AdminNav />
            <br />
            <br />
            <button className="btn btn-primary" style={{ marginLeft: "15px" }} onClick={randomize}>
                SPL-1 Randomization
            </button>
            <br />
            <br />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Roll</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>SPL-1 Supervisor</th>
                    </tr>
                </thead>
                <tbody className={classes.body}>
                    {tableData.map((row) => (
                        <tr key={row.roll}>
                            <td>{row.rollNo}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.supervisorName}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
