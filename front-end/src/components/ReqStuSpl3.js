// import React from "react";
// import AdminNav from "./ComNav";
// import Stu1 from "../Students/Stu1.js";
// import Stu2 from "../Students/Stu2.js";
// import Stu3 from "../Students/Stu3.js";
// import Stu4 from "../Students/Stu4.js";

// export default function StuContainer() {
//   return (
//     <>
//       {/* <AdminNav/> */}
//       <a href="#" className="btn btn-primary" style={{ marginLeft: "23px" }}>
//         SPL-2 Students Request
//       </a>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
//           gap: "20px",
//           padding: "20px",
//         }}
//       >
//         <Stu1 />
//         <Stu2 />
//         <Stu3 />

//         {/* <Stu5 />
//       <Stu6 />
//       <Stu7 />
//       <Stu8 /> */}
//       </div><br/><br/>
      

//       <a href="#" className="btn btn-primary" style={{ marginLeft: "23px" }}>
//           SPL-3 Students Request
//         </a>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
//           gap: "20px",
//           padding: "20px",
//         }}
//       >
        
//         <Stu4 />
//       </div>
//     </>
//   );
// }




import React, { useEffect, useState } from "react";
import axios from "axios";
import img1 from "../Assets/images/blank.png";

export default function ReqStu() {
  const [requestedStudents, setRequestedStudents] = useState([]);

  useEffect(() => {
    getRequestedStudents();
  }, []);

  const getRequestedStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3005/api/user/request/student",
        { withCredentials: true }
      );

      const data = response.data.data;
      console.log(data);
      setRequestedStudents(data);
    } catch (error) {
      console.error("Error fetching data:", error.response.data);
    }
  };

  const handleAccept = async (studentId) => {
    try {
      console.log(studentId);
      const response = await axios.put(
        `http://localhost:3005/api/supervisor-allocation/request/student/${studentId}`,
        {},
        { withCredentials: true }
      );
      

      console.log(response.data);
      // Refresh the requested students list
      getRequestedStudents();

      alert("Requested accepted")
    } catch (error) {
      console.error("Error accepting student:", error.response);
      alert("An error occured")
    }
  };

  const handleReject = async (studentId) => {
    try {
      console.log(studentId)
      const response = await axios.delete(
        `http://localhost:3005/api/supervisor-allocation/request/student/${studentId}`,
        { withCredentials: true }
      );

      console.log(response.data);
      // Refresh the requested students list
      getRequestedStudents();

      alert("Rejected student request successfully");
    } catch (error) {
      console.error("Error rejecting student:", error.response.data);
      alert("Error in rejecting")
    }
  };

  return (
    <>
    <h4 style={{margin:"40px"}}> <strong>SPL-3 Student Requests</strong></h4>
    
    <div className="container" style={{paddingBottom:"40px",margin:"40px"}}>
      <div className="row">
        {requestedStudents.map((student) => (
          <div className="col-md-4" key={student._id}>
            <div className="card">
              <img
                className="card-img-top"
                style={{marginLeft:"20px",marginTop:"20px"}}
                // src={`url/${student.avatar}`}
                src={student.avatar ? `http://localhost:3005/api/user/avatar/${student.avatar}` : img1}
                alt="Student Avatar"
              />
              <div className="card-body">
                <h5 className="card-title">{student.name}</h5>
                <h5 className="card-title">Batch: {student.batch}</h5>
                {/* <p className="card-text">{student.email}</p> */}
                <div>
                  <button
                    className="btn btn-success"
                    onClick={() => handleAccept(student.studentId)}
                  >
                    Accept
                  </button> &nbsp;&nbsp;&nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleReject(student.studentId)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
