import React from "react";
import { Link } from "react-router-dom";
import AlanEatsLogo from "../Images/AlanEatsLogo.png";
import "./css/Admin.css";

const Admin = () => {
  return (
    <div className="admin">
      <Link to="/">
        <img src={AlanEatsLogo} alt="alan eat" />
      </Link>
      <h1>Admin Panel</h1>
      <table className="orderTable">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Order Id</th>
            <th>Order Time</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tr>
          <th>1</th>
          <th>57023082</th>
          <th>12 Am</th>
          <th>
            <select>
              <option>Placed</option>
              <option>Confirmed</option>
              <option>Prepared</option>
              <option>Out for Delivery</option>
              <option>Completed</option>
            </select>
          </th>
        </tr>
        <tr>
          <th>2</th>
          <th>34434432</th>
          <th>2 Am</th>
          <th>
            <select>
              <option>Placed</option>
              <option>Confirmed</option>
              <option>Prepared</option>
              <option>Out for Delivery</option>
              <option>Completed</option>
            </select>
          </th>
        </tr>
        <tr>
          <th>3</th>
          <th>34835445</th>
          <th>5 pm</th>
          <th>
            <select>
              <option>Placed</option>
              <option>Confirmed</option>
              <option>Prepared</option>
              <option>Out for Delivery</option>
              <option>Completed</option>
            </select>
          </th>
        </tr>
        <tr>
          <th>4</th>
          <th>34434432</th>
          <th>3 pm</th>
          <th>
            <select>
              <option>Placed</option>
              <option>Confirmed</option>
              <option>Prepared</option>
              <option>Out for Delivery</option>
              <option>Completed</option>
            </select>
          </th>
        </tr>
      </table>
    </div>
  );
};

export default Admin;
