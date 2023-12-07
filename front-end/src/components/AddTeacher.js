import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNav from "./AdminNav";
import Footer from "./Footer";
import checkLogin from "../utilities/loginUtilities.js";


const InputForm = () => {

  //To protect URL...........
    useEffect(() => {
        protectUrl();
        fetchUserType();
      }, []);
    
      const navigate = useNavigate();
    
      const protectUrl = async () => {
        try {
          const userType = await checkLogin();
    
          if (userType === "teacher") {
            navigate("/ManagerProfile");
          } else if (userType === "student") {
            navigate("/StuProfile");
          } else if (userType === "admin") {
            navigate("/AddTeacher");
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





    const [users, setUsers] = useState([
        { name: "", email: "", designation: "" }, // Initial user row
    ]);

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedUsers = [...users];
        updatedUsers[index][name] = value;
        setUsers(updatedUsers);
    };

    const handleAddRow = () => {
        const updatedUsers = [...users];
        updatedUsers.push({ name: "", email: "", designation: "" });
        setUsers(updatedUsers);
    };

    const handleRemoveRow = (index) => {
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log("Users:", users);

            console.log(users);

            const res = await axios.post("http://localhost:3005/api/user/teacher", {teachers: users}, {
                withCredentials: true,
            });

            //  Reset the form fields
            setUsers([{ name: "", email: "", designation: "" }]);

            console.log(res.data);

            alert("Teachers accounts are created successfully");
        } catch (error) {
          console.log(error.response.data)
          alert("Invalid input");
        }
    };

    return (
        <>
            <AdminNav />
            <div style={{ backgroundColor:"skyblue"}}>
                <br />
                <form onSubmit={handleSubmit}>
                    {users.map((user, index) => (
                        <div key={index} style={{ marginTop:"20px",marginLeft:"250px"}}>
                            <label htmlFor={`name${index}`}>Name:</label>
                            <input
                                type="text"
                                id={`name${index}`}
                                name="name"
                                value={user.name}
                                onChange={(e) => handleInputChange(index, e)}
                                
                            /> &nbsp;&nbsp;&nbsp;

                            <label htmlFor={`email${index}`}>Email:</label>
                            <input
                                type="email"
                                id={`email${index}`}
                                name="email"
                                value={user.email}
                                onChange={(e) => handleInputChange(index, e)}
                            /> &nbsp;&nbsp;&nbsp;

                            <label htmlFor={`designation${index}`}>Designation:</label>
                            <input
                                type="text"
                                id={`designation${index}`}
                                name="designation"
                                value={user.designation}
                                onChange={(e) => handleInputChange(index, e)}
                            />

                            {index > 0 && (
                                <button style={{ marginLeft:"40px"}} type="button" onClick={() => handleRemoveRow(index)}>
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <button style={{ marginTop:"20px",marginLeft:"300px"}} type="button" onClick={handleAddRow}>
                        Add One More Row
                    </button>

                    <button style={{ marginTop:"20px",marginLeft:"40px"}} type="submit">Submit</button>
                </form>
            </div>
            <Footer/>
        </>
    );
};

export default InputForm;
