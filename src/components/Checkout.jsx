import axios from "axios";
import React from "react";
import "./css/Checkout.css";
import Subtotal from "./Subtotal";
import { useEffect, useState } from "react";
import CartImg from "./cartImg.jpg";
import Payment from "./Payment";
import Navbar from "./Navbar";


const Checkout = () => {
  let cartData = [];
  let totalCartPrice = 0;
  let totalItems = 0;
  let temp1;
  let [foodData, setFoodData] = useState([]);
  let [showPay,setShowPay] = useState(false);
  let userCredentials = localStorage.getItem("user logged in");
  let user = JSON.parse(userCredentials);
  let map = new Map();
  const [map1,setMap1] = useState(map);


  const setFoodQty = () => {
    let arr = cartData;
    for(let i = 0;i<arr.length;i++){
      if(map.has(arr[i])){
        let qty = map.get(arr[i]);
        map.set(arr[i],parseInt(qty) + 1);
      }else{
        map.set(arr[i],1);
      }
    }
    setMap1(map);
    let temp = [...map.keys()];
    return temp;
  }

  // useEffect(()=>{
  //   setFoodQty();
  // },[])

  const getUser = async () => {

    axios
      .get(`/api/user/${user[0]._id}`)
      .then((res) => {
        cartData = res.data.user.cart;
        temp1 = setFoodQty();
        console.log(cartData);
      })
      .then(async () => {
        let arr = await getFoodData();
        setFoodData(arr);
      });
  };

  let getFoodData = async () => {
    try {
      let arr = []; 
      arr = await Promise.all(
        temp1.map(async (id) => {
          let res = await axios.get(`/api/food/${id}`);
          return res.data.data;
        })
      );
      // document.location.reload(true)
      return arr;
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
      document.location.reload(true)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(user?.length !== 0)
      getUser();
  },[]);


  

  return (
    <>
    {
      (foodData.length > 0
            && foodData.map((item) => {
                totalItems = totalItems + map1.get(item._id);
                totalCartPrice = totalCartPrice + item.price *  map1.get(item._id);
              }) && 
      showPay) ? ( <Payment price = {totalCartPrice} />) : (<>
        <Navbar/>
        <div className="checkout">
        <div className="checkout_img">
          <img src={CartImg} alt="" />
        </div>
        <div className="subtotal-container">
          {foodData.length > 0 && totalCartPrice === 0 
            ? foodData.map((item) => {
                totalItems = totalItems +map1.get(item._id);
                totalCartPrice = totalCartPrice + item.price * map1.get(item._id);
              })
            : foodData.length}
          <Subtotal price={totalCartPrice} setShowPay = {setShowPay} items={totalItems} />
        </div>
        <h1>Shopping Cart</h1>
        <div className="checkout_items">
          {foodData.map((foodItem) => (
            <div className="foodItem_card">
              <div className="cartItem_image">
                <img src={foodItem.image_url} alt="" />
              </div>
              <div className="cartItem_info">
                <h3>{foodItem.label}</h3>
                <p>₹{foodItem.price}</p>
                <button
                  className="deleteBtn"
                  onClick={() => {
                    if(map1.get(foodItem._id) > 1)
                      map1.set(foodItem._id,map1.get(foodItem._id) - 1)
                    removeFromCart(foodItem._id);
                  }}
                >
                  Delete
                </button>
                <p>{`Qty: ${map1.get(foodItem._id)}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
      )
    }
    </>
  );
};

export default Checkout;