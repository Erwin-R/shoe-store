import React from "react";
import NavBar from "../components/NavBar";
import ShoppingCart from "../components/ShoppingCart";
import Footer from "../components/Footer";

const ShoppingCartPage = (props) => {
  return(
    <>
      <NavBar /> 
      <ShoppingCart />
      <Footer />
    </>
  );
}

export default ShoppingCartPage;