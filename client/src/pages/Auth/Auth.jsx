import React from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState(true);

  // single function to handle all input, instead of handling each inpur separately
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    // default behavior to prevent page redirect to other page
    e.preventDefault();

    if (isSignUp) {
      data.password === data.confirmPassword
        ? // signUp <- action send to redux
          dispatch(signUp(data))
        : setConfirmPassword(false);
    } else {
      // logIn <- another action if not signed up
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPassword(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <div className="Auth">
      {/* Left Side with logo */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Social Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* Right side for sign up/ log in */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={data.username}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmPassword}
              />
            )}
          </div>

          <span
            style={{
              display: confirmPassword ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            *Password does not match. Please try again
          </span>
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                color: "rgba(36, 45, 73, 0.65)",
              }}
              onClick={() => {
                setIsSignUp((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? "Have an account already? Log in!"
                : "Don't have an account? Create one now!"}
            </span>
          </div>
          <button className="button infoButton" type="submit">
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
