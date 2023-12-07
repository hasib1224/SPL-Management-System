
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

export default function CreateSPL({ show2, handleClose2 }) {
  const [splName, setSplName] = useState("");
  const [academicYear, setacademicYear] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
  
      const data = {
        splName,
        academicYear
      };
  
      console.log(data);
  
      // Send the data to the backend
      const res = await axios.post("http://localhost:3005/api/spl", data)

      
      handleClose2();

      // console.log(res.data.message);

      alert(res.data.message);
    } catch (error) {
      handleClose2();
      // console.log(error.response.data.errors.splName.msg);
      alert(error.response.data.errors.splName.msg);
    }
  };

  return (
    <Modal show={show2} onHide={handleClose2}>
      <Modal.Header closeButton>
        <Modal.Title>Create SPL</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-bg-info">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="spl name">SPL Name</label>
            <select
              className="form-select text-bg-info"
              aria-label="Default select example"
              value={splName}
              onChange={(e) => setSplName(e.target.value)}
            >
              <option value="spl1">SPL1</option>
              <option value="spl2">SPL2</option>
              <option value="spl3">SPL3</option>
              
            </select>
          </div>

          <div>
          <div className="form-group">
            <label htmlFor="Academic Year">Academic Year</label>
            <input
              type="text"
              className="form-control"
              id="Academic Year"
              value={academicYear}
              onChange={(e) => setacademicYear(e.target.value)}
            />
          </div>
              
            
          </div>
          <br />
          <Button type="submit">Confirm</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
