import React from "react";
import Container from "../components/Container";
import Cart from "../components/Cart";
import CreditCard from "../components/CreditCard";

function ShoppingCart() {
  return (
    <div>
      <Container>
        <Cart />
        <CreditCard />
      </Container>
</div>
  );
}

export default ShoppingCart;