import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './claims.css';
const Claims = () => {
  const [claims, setClaims] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  // const id=localStorage.getItem("userId");
  useEffect(() => {
    if (role === "patient" ) {
      alert("Unauthorized access");
      navigate("/newRequest");
    } else {
      fetchAllClaims();
    }
  }, [navigate, role]);

  const fetchAllClaims = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/claim/all`);
      setClaims(response.data.claims);
    } catch (error) {
      console.error("Error fetching claims:", error);
      setErrorMessage("Error fetching claims. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="all-claims">
        <h4>All Claims</h4>
        <hr />
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <table className="table table-striped shadow text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">Claim ID</th>
              <th scope="col">Member ID</th>
              <th scope="col">Member Name</th>
              <th scope="col">Insurance Plan</th>
              <th scope="col">Request Date</th>
              <th scope="col">Claim Amount</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.id}</td>
                <td>{claim.memberId}</td>
                <td>{claim.name}</td>
                <td>{claim.insurancePlan}</td>
                <td>{claim.claimDate}</td>
                <td>{claim.claimAmount}</td>
                <td>{claim.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Claims;
