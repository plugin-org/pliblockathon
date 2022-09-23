import React from "react";
import home from "../assets/home.png";
export default function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="content">
          <h1 className="title">The <br />Ultimate<br />Bank</h1>
          <p className="description">
          Buy/Sell Houses on the blockchain. Get Loans & Insurance.
          Get Interest for your Deposits. Fractionalise your Assests. 
          </p>
          <button>Sell House</button>
        </div>
        <div className="image-container">
          <div className="image">
            <img src={home} alt="home image" />
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
