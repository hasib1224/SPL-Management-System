import React, { useState } from "react";
import InterestedFields from "./InterestedFields";
import StuNav from "./StuNav";
import axios from "axios";

const EditInformation = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSave = () => {
    // const isAvailable = available === "Active";
    // Prepare the data object to be sent to the backend
    const data = {
      name,
      details,
      phone,
      gender,
    };

    // console.log(data);

    Object.keys(data).forEach((key) =>
      data[key] === "" || data[key] === undefined ? delete data[key] : data[key]
    );

    console.log(data);

    axios
      .put("http://localhost:3005/api/user/student", data, {
        withCredentials: true,
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <StuNav />
      <div>
        <div
          className="edit-information text-bg-info"
          style={{ padding: "20px" }}
        >
          <h4>Update Information</h4> <br />
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="details" className="form-label">
              Project Details
            </label>
            <textarea
              className="form-control"
              id="details"
              rows="5"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>

        <InterestedFields />
      </div>
    </>
  );
};

export default EditInformation;
