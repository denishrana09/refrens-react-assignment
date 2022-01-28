import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { CartHeader } from "../components";
import CartContext from "../context";

const Home = () => {
  const [list, setList] = useState();
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useContext(CartContext);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products");
        setList(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const addToCart = (item) => {
    const index = cart.findIndex((x) => x.id === item.id);
    if (index > -1) {
      const newState = [...cart];
      newState[index] = {
        ...newState[index],
        count: cart[index].count + 1,
      };
      setCart(newState);
    } else {
      item.count = 1;
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (itemId) => {
    const index = cart.findIndex((x) => x.id === itemId);
    if (index > -1) {
      const newState = [...cart];
      if (cart[index].count === 1) {
        newState.splice(index, 1);
      } else {
        newState[index].count = newState[index].count - 1;
      }
      setCart(newState);
    }
  };

  return (
    <div className="home-cnt">
      <CartHeader />
      {list.map((item) => (
        <div className="home-items-wrap" key={item.id}>
          <div>{item.title}</div>
          <div>{item.description}</div>
          <div>{item.price}</div>
          <img src={item.image} alt="product" width={60} height={60} />
          <button onClick={() => addToCart(item)}>+</button>
          <br />
          <button onClick={() => removeFromCart(item.id)}>-</button>
          <br />
          <button onClick={() => history.push(`/${item.id}`)}>
            Detail View
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
