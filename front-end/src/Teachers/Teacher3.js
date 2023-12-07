import React from "react";
import img from "../Assets/images/ShoibSir.JPG";
import icon from "../Assets/images/sch-icon.png";

export default function TeachersProfileGrid() {
  return (
    <>
      <div class="card" style={{ width: "18rem", margin: "10px" }}>
        <img
          class="card-img-top"
          style={{ margin: "20px" }}
          src={img}
          alt="Card image cap"
        />
        <div class="card-body">
          <h4 class="card-title">Dr. Mohammad Shoyaib</h4>
          <h5>Professor IIT,DU</h5>
          <p class="card-text">Currently Working on .....</p>
          <br />
          <a
            href="https://scholar.google.com/citations?user=G88J0-EAAAAJ&hl=en"
            target={"_blank"}
          >
            <img
              class="card-img-top"
              style={{ width: "40px", height: "40px" }}
              src={icon}
              alt="Card image cap"
            />{" "}
            &nbsp; &nbsp; &nbsp;
          </a>
          <button className="btn btn-primary">Request</button> &nbsp;
          <button className="btn btn-primary">Cancel</button>
        </div>
      </div>
    </>
  );
}