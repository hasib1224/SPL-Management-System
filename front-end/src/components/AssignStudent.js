import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

export default function MyForm({ show, handleClose }) {
  const [curriculumYear, setCurriculumYear] = useState("2nd");
  const [splName, setSplName] = useState("spl1");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(splName);
    const data = {
      splName,
      curriculumYear
    };

    console.log(data);

    try {
      const response = await axios.post(`http://localhost:3005/api/spl/assign/${data.splName}`);

      console.log(response.data);
      handleClose();

      alert("Students are successfully assigned to SPL")
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
      // alert("Unable to assign");
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Assign SPL to a batch</Modal.Title>
      </Modal.Header>
      <Modal.Body className=" text-bg-info">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="CurriculumYear">CurriculumYear</label>
              <select
                className="form-select text-bg-info"
                aria-label="Default select example"
                value={curriculumYear}
                onChange={(e) => setCurriculumYear(e.target.value)}
              >
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </select>
            </div>
          </div>
         
          <div>
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
          </div>
          <br />
          <Button type="submit">Confirm</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function MyModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Open Form Modal
      </Button>

      <MyForm show={show} handleClose={handleClose} />
    </>
  );
}
