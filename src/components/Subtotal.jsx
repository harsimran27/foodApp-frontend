import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import { PayAction, DeliveryAddressAction } from "../redux/actions/payAction";
import "./css/Subtotal.css";

const Subtotal = ({ price, items, setShowPay }) => {
  const dispatch = useDispatch();
  const [address, setDeliveryAddress] = useState("");
  const { deliveryAddress } = useSelector((state) => state.pay);
  // console.log(state);
  // console.log(deliveryAddress);
  // console.log(deliveryAddress);

  const saveAddress = () => {
    dispatch(DeliveryAddressAction(deliveryAddress));
    setDeliveryAddress("");
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={() => (
          <>
            <p>
              Subtotal ({items} items): <strong>₹{price}</strong>
            </p>
            <small className="subtotal_gift">
              {/* <input type="checkbox" />
              This order contains a gift */}
              <input
                className="subtotal__input"
                type="text"
                placeholder="Enter your delivery address"
                value={deliveryAddress.length > 0 ? deliveryAddress : address}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </small>
          </>
        )}
        decimalText={2}
        value="0"
        displayType="text"
        thousandSeparator={true}
        prefix={"₹"}
      />
      <button
        onClick={() => {
          if (deliveryAddress.length === 0 && address.length === 0) {
            alert(
              "Please enter your delivery address before procedding with the payment!!"
            );
          } else {
            saveAddress();
            setShowPay(true);
            dispatch(PayAction(true));
          }
        }}
        className="subtotal_button"
      >
        Proceed to checkout
      </button>
    </div>
  );
};

export default Subtotal;
