import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import AdminNav from "./AdminNav.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkLogin from "../utilities/loginUtilities.js";

function MyTable2() {
    const [teamData, setTeamData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      isAdmin();

        // Fetch team data using Axios
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3005/api/team/all-with-supervisor"
                );
                setTeamData(response.data.data);
                console.log(response);
            } catch (error) {
                console.error("Error fetching team data:", error);
            }
        };

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

    return (
        <>
            <AdminNav />
            <div style={{ backgroundColor: "skyblue" }}>
                <br />

                <Table striped bordered hover style={{ border: "2px solid black" }}>
                    <thead style={{ backgroundColor: "blue" }}>
                        <tr>
                            <th>Team Name</th>
                            <th>Roll</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>SPL-2 Supervisor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamData.map((team, index) => (
                            <React.Fragment key={index}>
                                <tr style={{ backgroundColor: "lightgreen" }}>
                                    <td rowSpan={team.members.length}>{team.teamName}</td>
                                    <td>{team.members[0].rollNo}</td>
                                    <td>{team.members[0].name}</td>
                                    <td>{team.members[0].email}</td>
                                    <td rowSpan={team.members.length}>{team.supervisorName}</td>
                                </tr>
                                {team.members.slice(1).map((member, i) => (
                                    <tr style={{ backgroundColor: "lightgreen" }} key={i}>
                                        <td>{member.rollNo}</td>
                                        <td>{member.name}</td>
                                        <td>{member.email}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default MyTable2;
