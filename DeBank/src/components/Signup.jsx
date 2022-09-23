import React from "react";
import signup from "../assets/signup.png";
export default function Signup() {
  return (
    <div className="signup">
      <div className="container">
        <div className="content">
          <h1 className="title">  Stake/ <br />UnStake </h1>
          <p className="description">
           Get Interest for Staking your XDC Tokens.
          </p>
        </div>
        <div className="image-container">
          <div className="image">
            <img src={signup} alt="home"/>
          </div>
          <div className="ellipse-container">
            <div className="ellipse pink"></div>
            <div className="ellipse orange"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
