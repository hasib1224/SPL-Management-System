import React, { useState } from "react";

export default function CreateStudentForm() {
  const [supervisorEmail, setSupervisorEmail] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [splName, setSplName] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "supervisorEmail") {
      setSupervisorEmail(value);
    } else if (name === "studentEmail") {
      setStudentEmail(value);
    } else if (name === "splName") {
      setSplName(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any necessary form validation or data handling here
    // For this example, we'll just log the values
    console.log("Supervisor Email:", supervisorEmail);
    console.log("Student Email:", studentEmail);
    console.log("SPL Name:", splName);

    // Reset form fields
    setSupervisorEmail("");
    setStudentEmail("");
    setSplName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Supervisor Email:
          <input
            type="email"
            name="supervisorEmail"
            value={supervisorEmail}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Student Email:
          <input
            type="email"
            name="studentEmail"
            value={studentEmail}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          SPL Name:
          <select name="splName" value={splName} onChange={handleInputChange}>
            <option value="">Select SPL</option>
            <option value="spl1">SPL 1</option>
            <option value="spl2">SPL 2</option>
            <option value="spl3">SPL 3</option>
          </select>
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
