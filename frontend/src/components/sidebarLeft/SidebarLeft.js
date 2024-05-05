import React from "react";
import "./SidebarLeft.css";

function SidebarLeft() {
  return (
    <div className="sidebar-left">
      <h5 className="sidebar-left-heading">What you can do!</h5>
      <ul className="sidebar-left-link">
        <li>
          <a href="#">Digital Journaling</a>
        </li>
        <li>
          <a href="#">Blogging</a>
        </li>
        <li>
          <a href="#">Newspaper</a>
        </li>
        <li>
          <a href="#">Magazines</a>
        </li>
      </ul>

      <h5 className="sidebar-left-heading">Help</h5>
      <ul className="sidebar-left-link">
        <li>
          <a href="#">Sign Up</a>
        </li>
        <li>
          <a href="#">Login</a>
        </li>
        <li>
          <a href="#">Terms of Service</a>
        </li>
        <li>
          <a href="#">Privacy Policy</a>
        </li>
      </ul>

      <h5 className="sidebar-left-heading">Contact Us</h5>
      <p className="contact-info">
        Contact us if you need help with anything
      </p>
      <p className="contact-info">+91 9999999999</p>

      <div className="text-center mt-5">
        <p className="footer-alt mb-0 f-14">2024 © VNR, All Rights Reserved</p>
      </div>
    </div>
  );
}

export default SidebarLeft;
