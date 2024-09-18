// UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  console.log(userId);
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/auth/user/${userId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Fetching user data failed', error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <>
        {user.userPhone}
    </>
  );
};

export default Profile;
