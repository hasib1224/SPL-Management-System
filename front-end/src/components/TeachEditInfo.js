import React, { useState } from "react";
import InterestedFields from "./InterestedFields";
import StuNav from "./StuNav";
import axios from "axios";

const EditInformation = () => {
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [available, setAvailable] = useState("");
    const [details, setDetails] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");

    const handleSave = () => {
        // const isAvailable = available === "Active";
        // Prepare the data object to be sent to the backend
        const data = {
            name,
            designation,
            available,
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
            .put("http://localhost:3005/api/user/teacher", data, {
                withCredentials: true,
            })
            .then((response) => {
                // console.log(response.data);
                alert(response.data.message);
            })
            .catch((error) => {
                console.error(error);
                alert("Invalid data");
            });
    };

    return (
        <>
            <StuNav />
            <div>
                <div className="edit-information text-bg-info" style={{ padding: "20px" }}>
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
                            <label htmlFor="designation" className="form-label">
                                Designation
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="designation"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
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
                        <div className="col-md-4">
                            <label htmlFor="available" className="form-label">
                                Availability
                            </label>
                            <select
                                className="form-select"
                                id="available"
                                value={available}
                                onChange={(e) => setAvailable(e.target.value === "true")}
                            >
                                <option value={true}>Available</option>
                                <option value={false}>Unavailable</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="details" className="form-label">
                            Current Research Details
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
                        <button type="button" className="btn btn-primary" onClick={handleSave}>
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
