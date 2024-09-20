import axios from "axios";
import React, { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cartProducts?token=${token}`,);
        console.log('API Response:', response.data);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProducts();
    } else {
      setError('No token found');
      setLoading(false);
    }
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="m-10 font-extrabold">Your Cart</h2>
      {products != null ? (
        <div className="px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {products.map((product) => (
            <CartProduct key={product.id} product={product}></CartProduct>
          ))}
        </div>
      ) : (
        <p>No products in your cart.</p>
      )}
      <Link to={'/checkout'} >
      <button className="absolute bottom-10 right-10 bg-blue-500 text-white p-3 rounded">Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
