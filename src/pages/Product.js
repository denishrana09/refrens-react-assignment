import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartHeader } from "../components";

const Home = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };
    getData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CartHeader />
      <div className="product-cnt">
        <div>{product.title}</div>
        <div>{product.description}</div>
        <div>{product.price}</div>
        <img src={product.image} alt="product" width={60} height={60} />
      </div>
    </>
  );
};

export default Home;
