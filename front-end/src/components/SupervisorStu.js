import React, { useState, useEffect } from "react";
import axios from "axios";
import ManNav from "./ManNav";
import checkLogin from "../utilities/loginUtilities.js";
import { useNavigate } from "react-router-dom";

const StudentTable = () => {


  //To protect URL...........
  const navigate = useNavigate();

  const protectUrl = async () => {
    try {
      const userType = await checkLogin();

      if (userType === "teacher") {
        navigate("/SupervisorStu");
      } else if (userType === "student") {
        navigate("/StuProfile");
      } else if (userType === "admin") {
        navigate("/CreateTeam");
      } else {
        navigate("/Login");
      }
    } catch (error) {
      console.log(error);
      navigate("/Login");
    }
  };

  const fetchUserType = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/user", {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error fetching data:", error.response.data);
    }
  };

  //............... protected URL...........




  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState(students.map(() => ""));


  useEffect(() => {

    //Url Protecting
    protectUrl();
    fetchUserType();
    // Fetch the data and update the students state
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/user/assigned/student",
          {
            withCredentials: true,
          }
        );
        const data = response.data.data;
        console.log(data);
        setStudents(data);
        const marks = new Array(data.length);
        // setMarks(marks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleMarksChange = (index, event) => {
    const updatedMarks = [...marks];
    updatedMarks[index] = event.target.value;
    setMarks(updatedMarks);
  };
  

  const handleSubmit = async (studentId, mark) => {
    try {
      console.log(studentId, mark);
      await axios.post(
        `http://localhost:3005/api/marking/supervisor/${studentId}`,
        {
          mark,
        },
        {
          withCredentials: true,
        }
      );
      alert("Marks submitted successfully!");
      // You can handle any success actions here
    } catch (error) {
      console.error("Error submitting marks:", error);
      // You can handle any error actions here
      alert("Error submitting supervisor mark");
    }
  };

  return (
    <>
      <ManNav />
      <br />

      <div>
        <table style={{ padding: "200px", paddingRight: "20px" }}>
          <thead style={{ background: "darkgray" }}>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>SPL</th>
              <th>Supervisor Marks</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.rollNo}</td>
                <td>{student.splName.toUpperCase()}</td>
                <td>
                  {student.supervisorMark ? (
                    student.supervisorMark
                  ) : (
                    <input
                      type="text"
                      value={marks[index]}
                      onChange={(event) => handleMarksChange(index, event)}
                    />
                  )}
                  {student.supervisorMark ? "" : (<button
                    onClick={() =>
                      handleSubmit(student.userId, marks[index])
                    }
                  >
                    Submit
                  </button>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentTable;
