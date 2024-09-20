// UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserProfileProduct from './UserProfileProduct'; // Removed the extra period in import
import axios from 'axios';

const Profile = () => {
  const { userId } = useParams(); // Ensure userId is correctly extracted from the URL
  console.log("userId", userId);

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data for userId:", userId);
        const response = await axios.get(`http://localhost:8080/api/auth/user/${userId}`);
        const data = response.data; // No need to check response.ok, as Axios handles errors automatically
        console.log("Fetched user data:", data);
        setUser(data); // Set the user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        console.log("Fetching products for userId:", userId);
        const response = await axios.get(`http://localhost:8080/api/product/${userId}`);
        const productsData = response.data; // Extract products data
        setProducts(productsData); // Set the products state
        console.log("Fetched products:", productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Fetch data only if userId is available
    if (userId) {
      fetchUserData();
      fetchProducts();
    }
  }, [userId]); // Ensure useEffect runs only when userId changes

  if (!user) return <p>Loading user data...</p>; // Show loading while fetching user data

  return (
    <>
      <p>{user.userPhone}</p>
      <p>{user.userName}</p>
      <p>{user.userEmail}</p>

      <h3>Your Orders</h3>
      <h3>Your Products</h3>

      <div className="p-4 grid-container grid grid-cols-5 gap-7 self-start ml-10 mt-10">
        {products.length > 0 ? (
          products.map((product) => (
            <UserProfileProduct key={product.id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </>
  );
};

export default Profile;
