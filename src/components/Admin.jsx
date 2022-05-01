import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlanEatsLogo from "../Images/AlanEatsLogo.png";
import "./css/Admin.css";
import { capitalize } from "@material-ui/core";

const Admin = () => {
  const [orderData, setOrderData] = useState([]);
  const [newStatus, setNewStatus] = useState({});

  const orderId = JSON.parse(localStorage.getItem("orderId"));
  const time = JSON.parse(localStorage.getItem("orderTime"));
  console.log(time);

  useEffect(() => {
    axios.get(`/api/order/`).then((res) => {
      setOrderData([...res.data.data]);
      
      localStorage.setItem(
        "orderTime",
        JSON.stringify([res?.data?.data?.createdAt])
      );
      console.log(res.data.data);
    });
  }, [newStatus.orderId, newStatus.status, newStatus.createdAt, orderData]);
  console.log(orderData?.createdAt);

  useEffect(() => {
    if (newStatus) {
      axios.patch(`/api/order/${newStatus.orderId}`, {
        status: newStatus.status,
        orderId: newStatus.orderId,
        createdAt: newStatus.createdAt,
      });
      // localStorage.setItem("orderTime", JSON.stringify([newStatus?.createdAt]));
    }
  }, [newStatus.orderId, newStatus.status, newStatus.createdAt]);

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
            <th>Customer Name</th>
            <th>Order Id</th>
            <th>Order Status Time</th>
            <th>Order Status</th>
          </tr>
        </thead>
        {orderData.map((order, idx) => (
          <tr>
            <th>{idx + 1}</th>
            <th>{capitalize(order.username)}</th>
            <th>{order.orderId}</th>
            <th>
              {new Date(order.createdAt).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </th>
            <th>
              <select
                value={
                  order.orderId === newStatus.orderId
                    ? newStatus.status
                    : order.status
                }
                onChange={(e) => {
                  setNewStatus({
                    orderId: order.orderId,
                    status: e.target.value,
                    createdAt: Date.now(),
                  });
                  // setOrderId(order.orderId);
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
      </table>
    </div>
  );
};

export default Admin;
