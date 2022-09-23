import React from "react";
import Card from "./Card";
import super1 from "../assets/super1.png";
import super2 from "../assets/super2.png";
import super3 from "../assets/super3.png";
import super4 from "../assets/super4.png";

export default function SuperRare() {
  const data = [
    {
      image: super1,
      title: "Casa Grande",
      price: 2.99,
      tag: 1,
      time: 1,
    },
    {
      image: super2,
      title: "Beach Villa",
      price: 3.99,
      tag: 2,
      time: 5,
    },
    {
      image: super3,
      title: "Ozone Villa",
      price: 4.99,
      tag: 3,
      time: 3,
    },
    {
      image: super4,
      title: "Red Blossom",
      price: 6.99,
      tag: 4,
      time: 4,
    },
  ];
  return (
    <div className="super-rare">
      <div className="title-container">
        <h2 className="title">DeBank MarketPlace</h2>
        <p className="description">
        Buy houses on our market place
        </p>
      </div>
      <div className="cards">
        {data.map(({ image, series, title, price, tag, time }, index) => (
          <Card
            image={image}
            series={series}
            title={title}
            price={price}
            tag={tag}
            time={time}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
