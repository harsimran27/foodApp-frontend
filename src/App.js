import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect, useState } from "react";
import axios from "axios";
// import AppWrapper from "../src/AppWrapper";
import Navbar from "./components/Navbar";
import FoodRow from "./components/FoodRow";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import MainImage from './components/MainImage';
import Payment from './components/Payment';
// import { navigate } from 'hookrouter';
// import { hashHistory } from 'react-router'


let App = () => {

  const history = useHistory();
  console.log(history);

  let userCredentials = localStorage.getItem("user logged in");
  let user = JSON.parse(userCredentials);

  useEffect(() => {
    let alanBtnInstance = alanBtn({
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
        } else if (commandData.command === "removeItem") {
          let { foodId, qty } = commandData.data;
          console.log(foodId, qty);
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
        } else if (commandData.command === "showcart") {
          // console.log(route);
          // console.log(history);
          // history.push('/checkout');
          // <Redirect to="/checkout" />
          // useRedirect('/user', '/dashboard');

          window.location.href = '/checkout';
          // alanBtnInstance.activate()
          // window.scrollBy(0, window.innerHeight);'
          // navigate('/checkout', true);
        }
      }
    });
  });

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
    // document.location.reload(true)
  };

  return (
    // <AppWrapper />
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar />
          <MainImage />
          <FoodRow />
          <FoodRow />
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
          <Navbar />
          <ProductDetail />
          <Footer />
        </Route>
        <Route path="/checkout">
          {/* <Navbar /> */}
          <Checkout />
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
