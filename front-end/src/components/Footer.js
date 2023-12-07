import React from "react";
import classes from "../styles/Footer.module.css";
import itlogo from "../Assets/images/IIT-logo.png";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto py-3" >
      <div className={classes.container} >
        <div className="row" >
          <div className="col-md-4">
            <a href="http://www.iit.du.ac.bd/" target="_blank">
              <img src={itlogo} alt="IIT logo" />
            </a>
            <p>
              Institute of Information Technology
              <br />
              University of Dhaka
            </p>
          </div>
          <div className="col-md-4 text-right"><br/><br/><br/>
            <p>&copy; {new Date().getFullYear()} Hasib Abdullah & Jubaer Hossain</p>
          </div>
          <div className="col-md-4 text-right">
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
