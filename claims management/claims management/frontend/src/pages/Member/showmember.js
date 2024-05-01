import React, { useState, useEffect } from "react";
import axios from "axios";

const UserDetails = ({ userId }) => {
  const userIdFromLocalStorage = localStorage.getItem("userid");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${userIdFromLocalStorage}`);
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userIdFromLocalStorage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.firstName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone Number:</strong> {user.phoneNo}</p>
      <p><strong>Insurance Plan:</strong> {user.insurancePlan}</p>
      <p><strong>Insurance Amount:</strong> {user.insuranceamount}</p>
    </div>
  );
};

export default UserDetails;
