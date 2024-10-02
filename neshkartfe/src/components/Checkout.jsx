import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState();
  const token = localStorage.getItem("jwtToken");
  const { user } = useAuth();
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const getQuantity = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/quantityOfProduct?jwt=${token}&productId=${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching cart product quantity:", error);
      return 0;
    }
  };

  async function orderRegister() {
    const order = {
      userId: userId,
      address: address,
      dateTime: new Date().toString(),
    };

    const response = await axios.post("http://localhost:8080/api/orderRegister", order);
    const orderId = response.data;

    for (let i = 0; i < products.length; i++) {
      const orderProduct = {
        orderId: orderId,
        productId: products[i].productId,
        quantity: products[i].productQuantity,
      };
      await axios.post("http://localhost:8080/api/orderProductRegister", orderProduct);
    }
  }

  async function paymentSuccessFull() {
    await axios.delete("http://localhost:8080/api/clearCart");
  }

  const paymentProcess = async (event) => {
    event.preventDefault();

    if (isProcessing) return;
    setIsProcessing(true);

    if (!stripe || !elements) {
      setError("Stripe is not loaded properly. Please try again later.");
      setIsProcessing(false);
      return;
    }

    if (!address) {
      setError("Please enter your address before proceeding.");
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch("http://localhost:8080/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      if (!response.ok) {
        setError("Failed to create payment intent. Please try again.");
        setIsProcessing(false);
        return;
      }

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        console.error("Payment error:", result.error.message);
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setIsPaymentComplete(true);
        paymentSuccessFull();
        orderRegister();
        navigate(`/user/${userId}`);
      } else {
        setError(`Payment failed with status: ${result.paymentIntent.status}`);
      }
    } catch (err) {
      console.error("Error during payment process:", err);
      setError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    async function getUserId() {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        console.error("JWT token is missing");
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/auth/userId?jwt=${jwtToken}`);
      setUserId(response.data * 1);
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/cartProducts?token=${token}`
        );
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);

        let totalAmount = 0;
        for (const product of fetchedProducts) {
          const quantity = await getQuantity(product.productId);
          totalAmount += product.productPrice * quantity;
        }

        setTotal(totalAmount);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    getUserId();
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
    <div className="flex flex-col lg:flex-row">
      {/* Left Side: Products */}
      <div className="lg:w-2/3 p-5">
        <h1 className="font-extrabold mt-5 ml-5">Your Items for Checkout</h1>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {products.map((product) => (
              <CheckoutProduct key={product.productId} product={product}></CheckoutProduct>
            ))}
          </div>
        ) : (
          <p>Buy new items</p>
        )}
      </div>

      {/* Right Side: Address, CardElement, and Pay Button */}
      <div className="lg:w-1/3 p-5">
        <div className="mb-6">
          <label className="block font-bold mb-2">Shipping Address</label>
          <textarea
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            className="border-black border-2 rounded h-40 w-full p-3"
            placeholder="Enter your address"
          />
        </div>

        <div className="mb-6">
          <label className="block font-bold mb-2">Payment Details</label>
          <div className="border-black border-2 rounded p-3">
            <CardElement />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg font-bold">Total: Rs. {total}</p>
        </div>

        <button
          onClick={paymentProcess}
          className="bg-blue-500 p-3 text-white rounded w-full"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : `Pay Rs.${total}`}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
