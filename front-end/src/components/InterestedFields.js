import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const InterestedFields = () => {
  const [selectedFields, setSelectedFields] = useState([]);

  const fields = [
    { name: 'Web Development', color: 'primary' },
    { name: 'Data Science', color: 'secondary' },
    { name: 'Artificial Intelligence', color: 'success' },
    { name: 'Cybersecurity', color: 'danger' },
    { name: 'UI/UX Design', color: 'warning' },
    { name: 'Blockchain', color: 'info' },
    { name: 'Cloud Computing', color: 'light' },
    { name: 'Mobile Development', color: 'dark' },
  ];

  const handleFieldClick = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((f) => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleFieldsSelected = () => {
    // Make an API call to the backend to save the selected fields
    axios.post('/api/saveFields', { fields: selectedFields })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const nav = useNavigate();
    const navigate = () => {
      // Check with database
      nav("/stuProfile");
    };

  return (
    <div className="interested-fields text-bg-secondary p-3" style={{ padding: "40px" }}>
      <h4>Interested Fields:</h4> <br/>
      <div className="d-flex flex-wrap ">
        {fields.map((field, index) => (
          <Button
            key={index}
            variant={`${selectedFields.includes(field.name) ? 'primary' : 'outline-primary'}`}
            className="me-2 mb-2  text-bg-success rounded-pill"
            onClick={() => handleFieldClick(field.name)}
          >
            {field.name}
          </Button>
        ))}
      </div>
      
      {selectedFields.length > 0 && (
        <div className="mt-3">
          <h4>Selected Fields:</h4>
          <ul>
            {selectedFields.map((field, index) => (
              <li key={index}>{field}</li>
            ))}
          </ul>
        </div>
      )}<br/>
      <div className="d-grid gap-2 col-6 mx-auto">
        <Button variant="primary" className=' mx-auto' onClick={navigate}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default InterestedFields;
