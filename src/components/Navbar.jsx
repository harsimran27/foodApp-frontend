import React from "react";
import "./css/Navbar.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userCreator } from "../redux/actions/userActions";
import AlanEatsLogo from "../Images/AlanEatsLogo.png";
import axios from "axios";
import { ShowModal } from "../redux/actions/ModalAction";
import AlanModal from "./AlanModal";

const Navbar = (props) => {
  let history = useHistory();
  let dispatch = useDispatch();

  const [show, handleShow] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [searchFood, setSearchFood] = useState("");

  let userCredentials = localStorage.getItem("user logged in");
  let user = JSON.parse(userCredentials);

  const searchFoodItem = () => {
    let getFood = foodItems.filter((food) => {
      console.log(food.label.includes(searchFood));
      if (food.label.toLowerCase().includes(searchFood.toLowerCase())) {
        return food;
      }
    });

    if (getFood.length === 0) {
      alert("No result Found...");
      history.push("/");
    } else history.push(`/productDetail/${getFood[0]._id}`);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  const getAllFoodItems = () => {
    axios.get("/api/food").then((res) => {
      setFoodItems(res.data.data);
    });
  };

  useEffect(() => {
    getAllFoodItems();
  }, []);

  return (
    <>
      {props.showModal ? <AlanModal /> : null}
      <div className={`nav ${show && "nav_black"}`}>
        <Link to="/">
          <img src={AlanEatsLogo} alt="alan eat" />
        </Link>
        <div className="nav_search">
          <input
            type="text"
            value={searchFood}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                setSearchFood("");
                searchFoodItem();
              }
            }}
            onChange={(e) => setSearchFood(e.target.value)}
            placeholder="Search your fav food item"
          />
          <SearchIcon
            className="nav_searchIcon"
            onClick={() => {
              setSearchFood("");
              searchFoodItem();
            }}
          />
        </div>

        <div className="nav_header">
          {user &&
          user[0] !== null &&
          user[0]?.email === "jaskeerat@gmail.com" ? (
            <div className="adminLink">
              <button
                className="adminBtn"
                onClick={() => {
                  history.push("/admin");
                }}
              >
                <img
                  style={{ width: "50px", height: "50px" }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTllTESQNMm-IWUp38QV_ubWFe97fa-tSSdrQ&usqp=CAU"
                  alt=""
                />
              </button>
            </div>
          ) : null}
          <div className="alan__instruction" style={{ marginRight: "18px" }}>
            <img
              className="micImg"
              src="https://i.pinimg.com/originals/84/21/97/8421973e4543fd21717eebdeba9d90ee.gif"
              alt=""
            />
            <button
              className="instructionsBtn"
              onClick={() => dispatch(ShowModal(true))}
            >
              Instructions
            </button>
          </div>
          <div
            className="nav_cart"
            onClick={() => {
              history.push("/checkout");
            }}
          >
            <ShoppingBasketIcon className="cartIcon" />
          </div>

          {!user ? (
            <span
              className="nav_signin"
              onClick={() => {
                history.push("/signin");
              }}
            >
              Sign In
            </span>
          ) : (
            <div className="loggedUser">
              <img className="user_logo" src={user[0]?.userImage} />
              <div className="loggedUser_info">
                <h4>{user[0]?.name}</h4>
                <button
                  className="logout_Btn"
                  onClick={() => {
                    localStorage.removeItem("user logged in");
                    dispatch(userCreator(false));
                    history.push("/signin");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
