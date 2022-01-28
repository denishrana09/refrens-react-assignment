import React, { useContext } from "react";
import CartContext from "../context";

const Cart = () => {
  const { cart } = useContext(CartContext);
  return (
    <div className="cart-cnt">
      {cart.map((item) => (
        <>
          <div>{item.title}</div>
          <div>{item.description}</div>
          <div>{item.price}</div>
          <img src={item.image} alt="product" width={60} height={60} />
          <div>Count: {item.count}</div>
        </>
      ))}
    </div>
  );
};

export default Cart;
