import React, { useState } from "react";
import img1 from "../Assets/images/blank.png";
import axios from "axios";

// useId = Teacher Id
const TeacherProfileCard = ({ userId, avatar, name, designation, project }) => {
    const [requestClicked, setRequestClicked] = useState(false);
    const [teamId, setTeamId] = useState(0);

    const handleRequest = async () => {
        setRequestClicked(true);

        try {
            const hasTeam = await axios.get("http://localhost:3005/api/team/member", {
                withCredentials: true,
            });

            const teamId = hasTeam.data.data.teamId;

            if (teamId) {
                // 3rd year team request
                setTeamId(teamId);

                const response = await axios.post(
                    `http://localhost:3005/api/supervisor-allocation/request/team/${teamId}/${userId}`,
                    {},
                    {
                        withCredentials: true,
                    }
                );
                alert("Request sent successfully");
            } else {
                setTeamId(0);

                // 4th year student request
                const response = await axios.post(
                    `http://localhost:3005/api/supervisor-allocation/request/student/${userId}`,
                    {},
                    {
                        withCredentials: true,
                    }
                );
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error.response);
            alert("Request failed");
        }
    };

    const handleCancel = async () => {
        try {
            setRequestClicked(false);
            // Perform any necessary cancel logic or API request

            if (teamId) {
                const res = await axios.delete(
                    `http://localhost:3005/api/supervisor-allocation/cancel-team-request/${teamId}/${userId}`,
                    {
                        withCredentials: true,
                    }
                );
            } else {
                const res = await axios.delete(
                    `http://localhost:3005/api/supervisor-allocation/cancel-student-request/${userId}`,
                    {
                        withCredentials: true,
                    }
                );
            }

            alert("Request cancelled");
        } catch (error) {
            console.log(error);
            alert("An error occured");
        }
    };

    return (
        <div className="card" style={{ width: "18rem", margin: "10px" }}>
            <img
                className="card-img-top"
                style={{ margin: "20px" }}
                src={avatar ? `http://localhost:3005/api/user/avatar/${avatar}` : img1}
                alt="Card image cap"
            />
            <div className="card-body">
                <h4 className="card-title">{name}</h4>
                <h5>{designation}</h5>
                {/* <h5>{userId}</h5> */}
                <p className="card-text">{project}</p>
                <br />
                <button className="btn btn-primary" onClick={handleRequest}>
                    {requestClicked ? "Requested" : "Request"}
                </button>{" "}
                &nbsp;
                {requestClicked && (
                    <button className="btn btn-primary" onClick={handleCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default TeacherProfileCard;
