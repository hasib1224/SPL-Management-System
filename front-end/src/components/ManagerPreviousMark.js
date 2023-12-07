import React from "react";
import ManNav from "./ManNav";

const StudentTable = () => {
  const students = [
    { name: "John Doe", roll: 1, marks: 80 },
    { name: "Jane Smith", roll: 2, marks: 90 },
    { name: "Tom Williams", roll: 3, marks: 75 },
    // Add more student data as needed
  ];

  return (

    <>
    <ManNav/>

    <br/>
    
    
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Roll</th>
          <th>Marks on Date</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>{student.name}</td>
            <td>{student.roll}</td>
            <td>{student.marks}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default StudentTable;
