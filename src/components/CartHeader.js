import React, { useContext } from "react";
import CartContext from "../context";
import { useHistory } from "react-router-dom";

const CartHeader = () => {
  const { cart } = useContext(CartContext);
  const history = useHistory();

  return (
    <div className="cart-header-cnt">
      Unique Items in Cart: {cart ? cart.length : 0}
      <button onClick={() => history.push("/cart")}>See Cart</button>
    </div>
  );
};

export default CartHeader;
