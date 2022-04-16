import React from "react";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import "./css/Subtotal.css";
import Payment from "./Payment";

const Subtotal = ({ price, items ,setShowPay }) => {
  const history = useHistory();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={() => (
          <>
            <p>
              Subtotal ({items} items): <strong>₹{price}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalText={2}
        value="0"
        displayType="text"
        thousandSeparator={true}
        prefix={"₹"}
      />
      <button onClick = {()=> {
        setShowPay(true);
        // history.push("/payment/:price")
        }}  className="subtotal_button">Proceed to checkout</button>
    </div>
  );
};

export default Subtotal;
