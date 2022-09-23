import React from "react";
import { BsArrowRight } from "react-icons/bs";
import release1 from "../assets/release1.png";
import release2 from "../assets/release2.png";
import release3 from "../assets/release3.png";
import release4 from "../assets/release4.png";


export default function Release() {
  return (
    <div className="releases">
      <div className="release orange">
        <div className="content">
          <h2 className="title">DeBank</h2>
          <p className="description">
          De-Bank is very similar to a bank powered with blockchain technology.
          <br />
          <br /> DB Market Homes where users can mint their home documents on our platform 
          and make it into a NFT. The minted NFT's can be sold to a buyer by which the smart contract transfers the digital ownership 
          to the respective person who bought it.
          <br />
          <br /> Where we stand out from a normal bank is by providing home loans which are paid in cryptocurrencies. 
          Buyers Can approach our Home Loans which are processed 10x faster than a normal bank without any documents or
          their credit score.
          </p>
          <a href="#" className="link">
            Check them out <BsArrowRight />
          </a>
        </div>
        <div className="image">
          <img src={release1} alt="release" />
        </div>
      </div>
      <div className="release green">
        <div className="card-container">
        <img src={release2} alt="release" />
        </div>
        <div className="content">
          <h2 className="title-1">Home Loans</h2>
          <p className="description-1">
          Get Home Loans from us without any cibil score.
          The ownership of the house will be in the name of the contract/DeBank until the loan amount is repaid.
          Buyers should have at least 25 percent of the total house value to be on their wallet.
          The smart contract transfers the NFT to the buyer once he repays the loan back to the bank.
          Creates lot of trust and security between the buyer and the platform.
          </p>
          <a href="#" className="link-1">
            Check them out <BsArrowRight />
          </a>
        </div>
      </div>
      <div className="release orange">
        <div className="content">
          <h2 className="title" >Insurance</h2>
          <p className="description">
          We use Decentralised Oracle for getting external datas & Integrate it on our smart contracts.
          Insurance claims are made faster on DeBank. 
          All the natural disasters, we have got you covered.
          
          </p>
          <a href="#" className="link">
            Check them out <BsArrowRight />
          </a>
        </div>
        <div className="image1" id ="release3" >
          <img src={release3} alt="release" />
        </div>
      </div>
      <div className="release green">
        <div className="card-container">
        <img src={release4} alt="release" />
        </div>
        <div className="content">
          <h2 className="title-1">Fractionalization of NFTs</h2>
          <p className="description-1">
          F-NFTs are created when a single NFT is divided into multiple
           fractions that can be sold as separate tokens. This would allow 
           buyers to own a percentage of a particular NFT, which they can 
           resell or manage
          </p>
          <a href="#" className="link-1">
            Check them out <BsArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
}
