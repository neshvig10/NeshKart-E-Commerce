import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserProfileProduct from './UserProfileProduct';
import axios from 'axios';

const Profile = () => {
  const { userId } = useParams();
  console.log("userId", userId);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data for userId:", userId);
        const response = await axios.get(`http://localhost:8080/api/auth/user/${userId}`);
        const data = response.data;
        console.log("Fetched user data:", data);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        console.log("Fetching products for userId:", userId);
        const response = await axios.get(`http://localhost:8080/api/product/${userId}`);
        const productsData = response.data;
        setProducts(productsData);
        console.log("Fetched products:", productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const jwt = localStorage.getItem("jwtToken")
        const response = await axios.get(`http://localhost:8080/api/orders?jwt=${jwt}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    if (userId) {
      fetchUserData();
      fetchProducts();
      fetchOrders();
    }
  }, [userId]);

  if (!user) return <p className="text-center text-gray-500">Loading user data...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="mb-4">
          <p><strong>Name:</strong> {user.userName}</p>
          <p><strong>Phone:</strong> {user.userPhone}</p>
          <p><strong>Email:</strong> {user.userEmail}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Your Orders</h3>
        <div className="grid grid-cols-1 gap-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.orderId} className="border p-4 rounded-lg">
                <div className="flex justify-between">
                  <div className="text-lg font-semibold">Order ID: {order.orderId}</div>
                  <div className="text-sm text-gray-600">{new Date(order.dateTime).toLocaleDateString()}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No Orders Placed</p>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Your Products</h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <UserProfileProduct key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-600">No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
