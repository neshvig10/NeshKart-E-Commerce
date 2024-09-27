import axios from "axios";
import React, { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import { useAuth } from "../contexts/AuthContext";
import CheckoutProduct from "./CheckoutProduct";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [address,setAddress] = useState(""); 
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwtToken");
  const { user } = useAuth();



  // Fetch the quantity of a product
  const getQuantity = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/quantityOfProduct?jwt=${token}&productId=${productId}`
      );
      return response.data; // Assuming the API returns just the quantity
    } catch (error) {
      console.error("Error fetching cart product quantity:", error);
      return 0; // Return 0 if there's an error
    }
  };

  // Fetch products and calculate total
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/cartProducts?token=${token}`
        );
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);

        let totalAmount = 0;

        // Loop through products and fetch quantity for each
        for (const product of fetchedProducts) {
          const quantity = await getQuantity(product.productId);
          totalAmount += product.productPrice * quantity; // Calculate total price for each product
        }

        setTotal(totalAmount); // Set the total price
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProducts();
    } else {
      setError("No token found");
      setLoading(false);
    }
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="font-extrabold mt-5 ml-5">Your Items for Checkout</h1>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 m-10">
          {products.map((product) => (
            <CheckoutProduct key={product.productId} product={product}></CheckoutProduct>
          ))}
        </div>
      ) : (
        <p>Buy new Items</p>
      )}
      <div className="mx-10"> 
        <label htmlFor="">Enter the name,phone number and address</label>
        <br />
        <textarea onChange={(e)=> {setAddress(e.target.value)}} value={address} className="border-black border-2 rounded h-40 w-1/3 p-3 text-left align-text-top" type="text" />
      </div>
        <br /><br />
        <p className="absolute right-20 font-extrabold">Total = Rs. {total}</p>
        <br /><br />
        <button className="bg-blue-500 p-3 text-white rounded absolute right-20 font-extrabold">Pay Rs.{total}</button>


    </div>
  );
};

export default Checkout;
