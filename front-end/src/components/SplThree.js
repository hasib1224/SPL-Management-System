import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import AdminNav from "./AdminNav.js";
import classes from "../styles/SplOne.module.css";
import axios from "axios";

export default function MyTable1() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3005/api/user/student/4th/supervisor",
        {},
        { withCredentials: true }
      );

      console.log(res.data.data)

      setTableData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminNav />
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Roll</th>
            <th>Name</th>
            <th>Email</th>
            <th>SPL-1 Supervisor</th>
          </tr>
        </thead>
        <tbody className={classes.body}>
          {tableData.map((row) => (
            <tr key={row.roll}>
              <td>{row.rollNo}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.supervisorName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </>
  );
}

