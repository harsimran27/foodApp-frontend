import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlanEatsLogo from "../Images/AlanEatsLogo.png";
import "./css/Admin.css";

const Admin = () => {
  const [orderData, setOrderData] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [orderId, setOrderId] = useState("");
  console.log(orderData);
  console.log(newStatus);
  useEffect(() => {
    axios.get(`/api/order/`).then((res) => {
      setOrderData(res.data.data);
    });
  }, [orderId]);

  useEffect(() => {
    if (newStatus) {
      axios.patch(`/api/order/${orderId}`, {
        status: newStatus,
        orderId: orderId,
        createdAt: Date.now(),
      });
    }
  }, [newStatus]);

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
        {orderData.map((order, idx) => (
          <tr>
            <th>{idx + 1}</th>
            <th>{order.orderId}</th>
            <th>{new Date(order.createdAt).toLocaleTimeString()}</th>
            <th>
              <select
                // {order?.orderId === orderId ?value={newStatus}:value={order.status} }
                value={order.orderId === orderId ? newStatus : order.status}
                onChange={(e) => {
                  setNewStatus(e.target.value);
                  setOrderId(order.orderId);
                }}
              >
                <option>Placed</option>
                <option>Confirmed</option>
                <option>Prepared</option>
                <option>Out for Delivery</option>
                <option>Completed</option>
              </select>
            </th>
          </tr>
        ))}
        {/* <tr>
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
        </tr> */}
      </table>
    </div>
  );
};

export default Admin;
