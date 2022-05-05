import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlanEatsLogo from "../Images/AlanEatsLogo.png";
import "./css/Admin.css";
import { capitalize } from "@material-ui/core";
import result from "../Images/result.gif";

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
    console.log(newStatus);
    if (newStatus.status === "Completed") {
      // setTimeout(() => {
      axios.delete(`/api/order/${newStatus.orderId}`);
      // setNewStatus({});
      // }, 3000);
    } else if (newStatus) {
      console.log("inside update");
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
        <img className="logo__img" src={AlanEatsLogo} alt="alan eat" />
      </Link>
      <h1>Admin Panel</h1>
      {orderData.length > 0 ? (
        <>
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
        </>
      ) : (
        <div className="emptyOrders">
          <img
            className="emptyOrders__img"
            src="https://delivery.namkalam.in/wp-content/uploads/2021/03/delivery.gif"
            alt=""
          />
          <img className="secondary__text" src={result} alt="" />
          {/* <h1 className="emptyOrders__info">No order to track...</h1> */}
        </div>
      )}
    </div>
  );
};

export default Admin;
