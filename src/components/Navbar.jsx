import React from "react";
import "./css/Navbar.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userCreator } from "../redux/actions/userActions";
import AlanEatsLogo from "../Images/AlanEatsLogo.png";

const Navbar = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  // console.log(history);

  let userStatus = useSelector((state) => state);

  const [show, handleShow] = useState(false);

  let userCredentials = localStorage.getItem("user logged in");
  let user = JSON.parse(userCredentials);

  useEffect(() => {
    // console.log(history);
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

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <Link to="/">
        <img src={AlanEatsLogo} alt="alan eat" />
      </Link>

      <div className="nav_search">
        <input type="text" placeholder="Search your fav food item" />
        <SearchIcon className="nav_searchIcon" />
      </div>

      <div className="nav_header">
        <div
          className="nav_cart"
          onClick={() => {
            history.push("/checkout");
          }}
        >
          <ShoppingBasketIcon className="cartIcon" />
        </div>

        <div
          className="nav_cart-f"
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
  );
};

export default Navbar;
