import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ Component }) {
  return (
    <div className="flex flex-col justify-between ">
      <Header />
      <div className="mb-auto h-full">{Component}</div>
      <Footer />
    </div>
  );
}

export default Layout;
