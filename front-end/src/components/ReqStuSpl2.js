import React, { useEffect, useState } from "react";
import axios from "axios";
import img from "../Assets/images/blank.png";

export default function StuProfileGrid() {
  const [requestedTeams, setRequestedTeams] = useState([]);

  useEffect(() => {
    getRequestedTeams();
  }, []);

  const getRequestedTeams = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3005/api/team/requested",
        {
          withCredentials: true,
        }
      );
      console.log(response.data.data);
      const data = response.data.data;

      setRequestedTeams(data);
    } catch (error) {
      console.error("Error fetching data:", error.response.data);
    }
  };

  const handleAccept = async (teamId) => {
    try {
        console.log(teamId)
      const res = await axios.put(
        `http://localhost:3005/api/supervisor-allocation/request/team/${teamId}`, {},
        {
          withCredentials: true,
        }
      );
      alert("Team accepted successfully!");

      getRequestedTeams();
    } catch (error) {
      console.error("Error accepting team:", error.response.data);
      alert("Error occured in accepting request");
    }
  };

  const handleReject = async (teamId) => {
    try {
        console.log(teamId)
      await axios.delete(
        "http://localhost:3005/api/team/reject",
        
        {
          withCredentials: true,
        }
      );
      alert("Team rejected successfully!");
      
    } catch (error) {
      console.error("Error rejecting team:", error.response.data);
      alert("Team request rejection failed")
    }
  };

  return (
    <>
      <h4 style={{ margin: "40px" }}>
        <strong>SPL-2 Team Requests</strong>
      </h4>

      {requestedTeams.map((team) => (
        <div
          className="card"
          style={{ width: "18rem", margin: "50px" }}
          key={team._id}
        >
          <h4
            className="card-title"
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            {team.teamName}
          </h4>
          <div className="card-img-container">
            {team.members &&
              team.members.map((member, index) => (
                <img
                  key={index}
                  className={`card-img-${index % 2 === 0 ? "left" : "right"}`}
                  src={
                    member.avatar
                      ? `http://localhost:3005/api/user/avatar/${member.avatar}`
                      : img
                  }
                  alt="Card image cap"
                />
              ))}
          </div>
          <div className="card-body">
            {team.members && (
              <>
                <h5>{team.members[0].name}</h5>
                <h5>{team.members[1].name}</h5>
              </>
            )}
            <p className="card-text">{team.description}</p>
            <br />
            <div className="btn-container">
              <button
                className="btn btn-primary"
                onClick={() => handleAccept(team.teamId)}
              >
                Accept
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleReject(team.teamId)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        .card-img-container {
          display: flex;
          justify-content: space-between;
        }

        .card-img-left {
          width: 18rem;
          height: 5rem;
          margin: 20px;
        }

        .card-img-right {
          width: 18rem;
          height: 5rem;
          margin: 20px;
        }

        .btn-container {
          display: flex;
          justify-content: space-evenly;
          margin-top: 10px;
        }
      `}</style>
    </>
  );
}
