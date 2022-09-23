import React from "react";

export default function Like() {
  return (
    <div className="like">
      <div className="container">
        <div className="content">
        <h2 class = "title" >Stake</h2>
        <div className="form">
        <form action="">

         <label class="label1">Enter the number of XDC Tokens to state</label><br />
         <input type="text" placeholder="XDC Tokens" class="text-field" /><br />
         <label class="label1">Number to DeBank Tokens you get</label><br />
         <input type="text" placeholder="DeBank Tokens" class="text-field" /><br />
         <label class="label1">Rate of Interest%</label><br />
         <input type="text" placeholder="ROI" class="text-field" /><br />
         <button class="button-like">Stake</button>
         
        </form>
        </div>
        </div>
        <div className="content">
        <h2 class = "title" >UnStake</h2>
        <p>No.Of DBT currently holding : XXXXXXXX</p>
        <div className="form">
        <form action="">

        <label class="label1">Enter the number of DBT Tokens to UnStake</label><br />
        <input type="text" placeholder="DBT" class="text-field" /><br />
        <button class="button-like">Un-Stake</button>

        </form>
        </div>
        </div>
      </div>
    </div>
  );
}
