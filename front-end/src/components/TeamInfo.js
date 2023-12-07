import React, { useState, useEffect } from "react";
import img from "../Assets/images/blank.png";
import axios from "axios"



const SingleTeam = () => {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    // Fetch team data from the API
    const fetchTeamData = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/team/member",{
            withCredentials: true,
        }); // Replace the URL with your API endpoint
        const data = response.data;
        console.log(data);
        setTeamData(data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };
  
    fetchTeamData();
  }, []);

  if (!teamData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card" style={{ width: "18rem", margin: "50px" }}>
      <h4 className="card-title" style={{ textAlign: "center", marginTop: "10px" }}>
        {teamData.teamName}
      </h4>
      <div className="card-img-container">
        {teamData.members &&
          teamData.members.map((member, index) => (
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
        {teamData.members && (
          <>
            <h5>{teamData.members[0].name}</h5>
            <h5>{teamData.members[1].name}</h5>
          </>
        )}
        <p className="card-text">{teamData.description}</p>
        <br />


        {/* <div className="btn-container">
          <button className="btn btn-primary" onClick={() => handleAccept(teamData.teamId)}>
            Accept
          </button>
          <button className="btn btn-primary" onClick={() => handleReject(teamData.teamId)}>
            Reject
          </button>
        </div> */}
      </div>

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
    </div>
  );
};

export default SingleTeam;
