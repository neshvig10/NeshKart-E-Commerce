import axios from "axios";
import React, { useEffect, useState } from "react";

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
      <h1>Your Cart</h1>
      {products != null ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
          {products.map((product) => (
            <div key={product.productId} className="border m-1 rounded-lg p-4 shadow-lg">
              <img src={product.image} alt={product.productName} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-xl font-semibold">{product.productName}</h2>
              <p className="text-gray-500">Rs. {product.productPrice}</p>
              <p>Nos. {product.productQuantity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products in your cart.</p>
      )}
    </div>
  );
};

export default Cart;
