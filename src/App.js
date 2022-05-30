import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import FoodRow from "./components/FoodRow";
import { Switch, Route, Link, useHistory, Redirect } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import MainImage from './components/MainImage';
import Payment from './components/Payment';
import { useDispatch, useSelector } from 'react-redux';
import { NoteToChefAction, PayAction } from "./redux/actions/payAction";
import Admin from "./components/Admin";
import ErrorPage from "./components/ErrorPage";
import { PaymentAction } from "./redux/actions/payAction";
import PayModal from './components/PayModal';
import Tracker from './components/Tracker';
import { DeliveryAddressAction } from "./redux/actions/payAction";

let App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let userCredentials = localStorage.getItem("user logged in");
  let user = JSON.parse(userCredentials);
  const orderId = JSON.parse(localStorage.getItem("orderId"));

  const showModal = useSelector(state => state.AlanModal);

  const [newAddress, setAddress] = useState("");
  const [alanInstance, setAlanInstance] = useState(null);
  const { totalPrice } = useSelector(state => state.pay);



  useEffect(() => {
    setAlanInstance(alanBtn({
      key: '536cbf69313e565d5b46b5bdcf234ac52e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'allItems') {

          window.scrollBy(0, window.innerHeight);

        } else if (commandData.command === "myItem") {
          let { foodId, qty } = commandData.data;
          foodId = foodId.toString();
          qty = qty.toString();
          let noQty = 0;
          if (qty === "to") {
            noQty = 2;
          } else if (qty === "three") {
            noQty = 3;
          } else if (qty === "four") {
            noQty = 4;
          } else if (qty === "five") {
            noQty = 5;
          } else {
            noQty = 1;
          }
          while (noQty-- > 0) {
            addToCart(foodId);
          }
          if (history.location.pathname === "/checkout") {
            setTimeout(() => {
              history.push("/");
              alanInstance?.setVisualState({ data: "/checkout" });
              history.push("/checkout");
            }, 3000)
          }
        } else if (commandData.command === "removeItem") {
          let { foodId, qty } = commandData.data;
          foodId = foodId.toString();
          qty = qty.toString();
          let noQty = 0;
          if (qty === "to") {
            noQty = 2;

          } else {
            noQty = 1;
          }
          while (noQty-- > 0) {
            console.log("----", noQty)
            removeFromCart(foodId);
          }
          if (history.location.pathname === "/checkout") {
            setTimeout(() => {
              history.push("/");
              history.push("/checkout");
            }, 3000)
          }
        } else if (commandData.command === "showcart") {
          dispatch(PayAction(false))
          history.push('/checkout');

        } else if (commandData.command === "payment") {
          dispatch(PaymentAction(true));
          dispatch(PayAction(true))
        } else if (commandData.command === "homepage") {
          setTimeout(() => {
            history.push("/");
          }, 3000)
        } else if (commandData.command === "goBack") {
          if (history.location.pathname !== "/") {
            history.goBack();
          }
        } else if (commandData.command === "goHome") {
          if (history.location.pathname !== "/") {
            history.push("/");
          }
        } else if (commandData.command === "setAddress") {
          console.log(commandData);
          let { address } = commandData.data;
          dispatch(DeliveryAddressAction(address))
        } else if (commandData.command === "addNote") {
          let { noteValue } = commandData.data;
          dispatch(NoteToChefAction(noteValue));
        }
         else if (commandData.command === "showInstructions"){
          
        }
      }
    }))
  }, []);

  let addToCart = async (foodId) => {
    try {
      console.log("voice script run", foodId);
      await axios.post("/api/user/cart", {
        food: foodId,
        user: user[0]._id.trim(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  let removeFromCart = async (foodId) => {
    try {
      await axios.post("/api/user/cart/delete", {
        user: user[0]._id,
        food: foodId,
      });
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Switch>
      <Route exact path="/">

        <Navbar showModal={showModal} />
        <MainImage />
        <FoodRow type="fast food" />
        <FoodRow type="sandwich" />
        <FoodRow type="burger" />
        <FoodRow type="noodles" />
        <FoodRow type="pizza" />
        <FoodRow type="drinks" />
        <Footer />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/payment">
        <Payment />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/productDetail/:foodId" >
        <Navbar showModal={showModal} />
        <ProductDetail />
        <Footer />
      </Route>
      <Route exact path="/checkout">

        <Navbar showModal={showModal} />
        <Checkout />
        <Footer />
      </Route>
      <Route exact path="/checkout/payment">
        <Navbar showModal={showModal} />
        <Payment price={totalPrice} />
        <Footer />
      </Route>

      {user !== null && user[0]?.email === "jaskeerat@gmail.com" ?
        <Route exact path="/admin" component={Admin} /> : <Route path="/admin" component={ErrorPage} />
      }

      {orderId && user !== null && user[0]?.email !== "jaskeerat@gmail.com" ?
        <Route exact path="/foodtracker">
          <Navbar showModal={showModal} />
          <Tracker />
          {/* <Footer /> */}
        </Route> : <Route path="/foodtracker" component={ErrorPage} />}

      <Route exact path="/order/payment/success">
        <PayModal orderId={orderId} />
      </Route>

    </Switch >
  );
}

export default App;
