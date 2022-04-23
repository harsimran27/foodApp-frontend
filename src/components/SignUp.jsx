import React from "react";
import "./css/SignIn.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import AlanEatsLogo from "../Images/AlanEatsLogo.png";

const SignUp = () => {
  let history = useHistory();

  const [name, nameSet] = useState("");
  const [img, setImg] = useState("");
  const [password, passwordSet] = useState("");
  const [email, emailSet] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = async () => {
    history.push("/signin");
    try {
      if (
        name.length > 0 &&
        img.length > 0 &&
        password.length > 0 &&
        email.length > 0 &&
        confirm.length > 0
      ) {
        await axios.post("/api/user/signup", {
          userImage: img,
          name: name,
          email: email,
          password: password,
          confirmPassword: confirm,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup">
      <Link to="/">
        <img src={AlanEatsLogo} className="signin_logo" alt="alan eat" />
      </Link>
      <div className="signin_container">
        <h1>Sign-up</h1>
        <form>
          <h5>Username</h5>
          <input
            type="file"
            accept="image/*"
            placeholder="Your Name"
            onChange={(e) => {
              setImg(URL.createObjectURL(e.target.files[0]));
            }}
          />

          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => nameSet(e.target.value)}
          />

          <h5>E-mail</h5>
          <input
            type="text"
            placeholder="your Email"
            onChange={(e) => emailSet(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            placeholder="**********"
            onChange={(e) => passwordSet(e.target.value)}
          />

          <h5>Confirm-Password</h5>
          <input
            type="password"
            placeholder="**********"
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            className="sign_inButton"
            onClick={() => {
              handleSignup();
            }}
          >
            Sign up
          </button>
        </form>
        <p>
          By signing-in you agree to the Alan Eats conditions. Please see our
          Privacy Notice
        </p>
      </div>
    </div>
  );
};

export default SignUp;
