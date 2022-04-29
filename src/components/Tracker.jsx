import React from "react";
import { useSelector } from "react-redux";
import "./css/Tracker.css";
// import DoneAllIcon from "@material-ui/icons/DoneAll";
// import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
// import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
// import FastfoodIcon from "@material-ui/icons/Fastfood";
// import LocalShippingIcon from "@material-ui/icons/LocalShipping";
// import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Stepper from "./Stepper";

const Tracker = () => {
  const { orderId } = useSelector((state) => state.pay);
  return (
    <div className="Tracker">
      <div className="main">
        <div className="first">
          <h1>Track Delivery Status</h1>
          <h3>{`Order id:-${orderId}`}</h3>
        </div>
        {/* <div className="second">
          <div className="one">
     
            <AssignmentTurnedInIcon className="icon" />
           
            <h3>Order Placed</h3>

          </div>
           <TrendingFlatIcon className="arrow" />
           <div className="two">
        
             <DoneAllIcon className="icon" />

        
             <h3>Order Confirmed</h3>

           
           </div>
          <TrendingFlatIcon className="arrow" />
           <div className="three">
           
             <FastfoodIcon className="icon icon-2x" />
       
             <h3>Order Prepared</h3>

        
           </div>
           <TrendingFlatIcon className="arrow" />
           <div className="four">
        
             <LocalShippingIcon className="icon icon-2x" />
       
             <h3>Out for delivery</h3>

            
          </div>
          <TrendingFlatIcon className="arrow" />
          <div className="five">
         
             <EmojiEmotionsIcon className="icon" />
           
             <h3>Complete</h3>

           </div>
        </div> */}
        <Stepper orderId={orderId} />
      </div>
    </div>
  );
};

export default Tracker;
